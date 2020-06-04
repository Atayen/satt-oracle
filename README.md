# satt-oracle

## getting started

```js
// in node.js
const so = require('satt-oracle');
const Web3 = require('web3');
const web3WsUrl = 'ws://127.0.0.1:8546'; // or any json-rpc url to ethereum blockchain service provider

var web3 = new Web3(web3WsUrl);
var sattOracle = new so(web3);
var onEvent = async (evt) => {
	//if(evt.typeSN == 1) 
	// facebook evt.idPost and evt.idUser
	//if(evt.typeSN == 2) 
	// youtube evt.idPost only
	//...
  
  await sattOracle.answer({idRequest:evt.idRequest,likes:0,shares:0,views:0},
  /*{from:0x,gas:200000,gasPrice:10000000000}*/)
}

sattOracle.subscribe(onEvent);


```
