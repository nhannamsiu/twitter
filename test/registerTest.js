const Twitter = artifacts.require("Twitter.sol")

function print(s){
  console.log(s)
}

// ganache-cli -h 0.0.0.0 -p 7777 -d -l 200000000 -g

contract('Register Test', (accounts) => {
  let meta

  it("init", async() => {
    meta = await Twitter.new()
    print(meta.address)
  })

  //registration succeeded
  it("Register accounts[0] as Alice", async() => {
    await meta.register('Alice',23,1, {from: accounts[0]})
  })

  //registration failed
  it("Already registered", async() => {
    try{
      await meta.register('Alice',21,2, {from: accounts[0]})
    }
    catch(err){
      console.log(err.toString())
    }
  })

  it("Username unavailable", async() => {
    try{
      await meta.register('Alice',21,2, {from: accounts[1]})
    }
    catch(err){
      console.log(err.toString())
    }
  })

  it("Under 18", async() => {
    try{
      await meta.register('Bob',17,1, {from: accounts[2]})
    }
    catch(err){
      console.log(err.toString())
    }
  })

  it("Invalid gender", async() => {
    try{
      await meta.register('Nam',21,3, {from: accounts[3]})
    }
    catch(err){
      console.log(err.toString())
    }
  })


  //register some more accounts
  it("Register accounts[1] as Bob", async() => {
    await meta.register('Bob',25,0, {from: accounts[1]})
  })

  it("Register accounts[2] as Nam", async() => {
    await meta.register('Nam',24,0, {from: accounts[2]})
  })

  //get profiles
  it("get Alice profile", async() => {
    let profile = await meta.getProfile('Alice')
    console.log(profile)
  })

  it("get Bob profile", async() => {
    let profile = await meta.getProfile('Bob')
    console.log(profile)
  })

  it("get Nam profile", async() => {
    let profile = await meta.getProfile('Nam')
    console.log(profile)
  })



})
