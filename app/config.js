if (typeof module !== "undefined"){
  Web3 = require("web3")
  CryptoUtils = require("loom-js").CryptoUtils
  LocalAddress = require("loom-js").LocalAddress
  LoomProvider = require("loom-js").LoomProvider
  Client = require("loom-js").Client
  createJSONRPCClient = require("loom-js").createJSONRPCClient
}

let transactionConfig
let networks = ['local','rinkeby','ropsten']

function parseNetworks(){
  for(network of networks){
    $('#networkOption')
    .append($("<option></option>")
    .attr("value",network).text(network))
  }
}


let config = {
  selectProvider: async function(option){
    if (option == networks[0]){
      transactionConfig = {from:'',gasPrice:0,gasLimit:200000000}
      return await this.localProvider()
    }
    else if (option == networks[1]){
      transactionConfig = {from:'',gasPrice:10000000000,gasLimit:6700000}
      return await this.rinkebyProvider()
    }
    else if (option == networks[2]){
      transactionConfig = {from:'',gasPrice:0,gasLimit:6700000}
      return await this.ropstenProvider()
    }
  },

  devPlasmaProvider: async function(){
    try{
      //init provider
      const privateKey = CryptoUtils.B64ToUint8Array(loomFirstAccount)
      const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
      const account = LocalAddress.fromPublicKey(publicKey).toString()

      //client config
      const client = new Client(
        'extdev-plasma-us1',
        'ws://extdev-plasma-us1.dappchains.com:80/websocket',
        'ws://extdev-plasma-us1.dappchains.com:80/queryws',
      )

      let provider = new LoomProvider(client, privateKey)
      //add new accounts from JSON
      for (acc of loomAccounts){
        provider.addAccounts([CryptoUtils.B64ToUint8Array(acc)])
      }

      let web3 = new Web3(provider)
      //prevent crash
      client.on('error',err=>{
        return
      })
      return web3
    }
    catch(err){
      console.log(err)
    }
  },

  localLoomProvider: async function(){
    try{
      //init provider
      const privateKey = CryptoUtils.B64ToUint8Array(loomFirstAccount)
      const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
      const account = LocalAddress.fromPublicKey(publicKey).toString()

      const client = new Client(
        'default',
        'ws://127.0.0.1:46658/websocket',
        'ws://127.0.0.1:46658/queryws',
      )
      let provider = new LoomProvider(client, privateKey)
      //add new accounts from JSON
      for (acc of loomAccounts){
        provider.addAccounts([CryptoUtils.B64ToUint8Array(acc)])
      }

      let web3 = new Web3(provider)
      //prevent crash
      client.on('error',err=>{
        return
      })
      return web3
    }
    catch(err){
      console.log(err)
    }
  },

  localProvider: async function(){
    try{
      const provider = new Web3.providers.WebsocketProvider('ws://localhost:7777')
      const web3 = new Web3(provider)
      return web3
    }
    catch(err){
      console.log(err)
    }
  },

  ganacheProvider: async function(){
    try{
      const provider = new Web3.providers.WebsocketProvider('ws://52.34.166.240:7777')
      const web3 = new Web3(provider)
      return web3
    }
    catch(err){
      console.log(err)
    }
  },

  rinkebyProvider: async function(){
    try{
      const web3 = new Web3(web3Metamask.currentProvider)
      let networkID = await web3.eth.net.getNetworkType()
      if (networkID != 'rinkeby'){
        writeLog('Please select rinkeby network on your Metamask plugin');
      }
      else{
        return web3
      }
    }
    catch(err){
      console.log(err)
    }
  },

  ropstenProvider: async function(){
    try{
      const web3 = new Web3(web3Metamask.currentProvider)
      let networkID = await web3.eth.net.getNetworkType()
      if (networkID != 'ropsten'){
        writeLog('Please select ropsten network on your Metamask plugin');
      }
      else{
        return web3
      }
    }
    catch(err){
      console.log(err)
    }
  },

  concordProvider: async function(){
    try{
      let host = 'https://mgmt.blockchain.vmware.com/blockchains/b4f0e6b6-05bc-4829-a5ea-153d8b202a48/api/concord/eth'
      let headers = {
        authorization: 'Basic bmFtQGZlcmRvbi5pbzpmZXJkb25pbw=='
      }


      const provider = new Web3.providers.HttpProvider(host,{headers:headers})
      const web3 = new Web3(provider)
      return web3
    }
    catch(err){
      console.log(err)
    }
  }
}

if (typeof exports !== 'undefined'){
  module.exports = config
}
