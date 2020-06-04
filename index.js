const Web3 = require('web3');
const Constants = require('./const/const');
const debug = require('debug')('satt-oracle')

function OracleManager(web3) {
	const self = this;
	
	self._web3 = web3;
	self._web3.transactionPollingTimeout = 600;
	self._web3.transactionConfirmationBlocks = 1;
	self._oracleContract = new self._web3.eth.Contract(Constants.oracle.abi,Constants.oracle.address.mainnet);

	self._oracleContract.inspect = () => {return ""};
	
	self.campaignAddress = Constants.campaign.address.mainnet;
	
	self.answer = async (params,opts) => {
		return new Promise(async (resolve, reject) => {
			
			var receipt = await self._oracleContract.methods.thirdPartyAnswer(
			self.campaignAddress,
			params.idRequest,
			params.likes,
			params.shares,
			params.views)
			
			.send(opts)
			   .on('error', function(error){ debug("thirdPartyAnswer error",error);
					reject(error);
			   })
			.once('transactionHash', function(transactionHash){debug("thirdPartyAnswer transactionHash",transactionHash) })
			
			resolve(receipt) ;
		})
	}
	
	self.subscribe = async (fn) => {
		self._oracleContract.events.AskRequest().on('data', async (event) => {
			if( evt.signature != "0xb67322f1a9b0ad182e2b242673f8283103dcd6d1c8a19b47ff5524f89d9758ed" || evt.event != "AskRequest")
			{		
				return;
			}
			var values = {
				idRequest:evt.returnValues.idRequest,
				typeSN:evt.returnValues.typeSN,
				idPost:evt.returnValues.idPost,
				idUser:evt.returnValues.idUser,
			}
			await fn(values);
		});
	}
}

module.exports = OracleManager;