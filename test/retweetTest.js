const Twitter = artifacts.require("Twitter.sol")

function print(s){
  console.log(s)
}

// ganache-cli -h 0.0.0.0 -p 7777 -d -l 200000000 -g

contract('Retweet Test', (accounts) => {
  let meta

  it("init", async() => {
    meta = await Twitter.new()
    print(meta.address)
  })

  //registration succeeded
  it("Register accounts[0] as Alice", async() => {
    await meta.register('Alice',23,1, {from: accounts[0]})
  })

  it("Register accounts[1] as Bob", async() => {
    await meta.register('Bob',25,0, {from: accounts[1]})
  })

  //post some tweets
  it("Post 1st tweet from Alice", async() => {
    await meta.post('Such a beautiful day', {from: accounts[0]})
  })

  it("Post 2nd tweet from Alice", async() => {
    await meta.post('Anyone wanna hangout on Friday?', {from: accounts[0]})
  })

  it("Post 3rd tweet from Alice", async() => {
    await meta.post('Adulthood is a trap, kids', {from: accounts[0]})
  })

  it("Post 1st tweet from Bob", async() => {
    await meta.post('Testing how this works', {from: accounts[1]})
  })

  //Alice retweets Bob
  it("Alice retweets Bob", async() => {
    await meta.retweet('Bob',0, {from: accounts[0]})
  })

  it("Alice retweets the retweet", async() => {
    await meta.retweet('Alice',3, {from: accounts[0]})
  })

  //Bob retweets Alice
  it("Bob retweets Alice", async() => {
    await meta.retweet('Alice',4, {from: accounts[1]})
  })

  //get Alice tweets
  it("Get tweets from Alice", async() => {
    let posts = await meta.getPosts('Alice')
    console.log(posts)
  })

  it("Get tweets from Bob", async() => {
    let posts = await meta.getPosts('Bob')
    console.log(posts)
  })







})
