const Twitter = artifacts.require("Twitter.sol")

function print(s){
  console.log(s)
}

// ganache-cli -h 0.0.0.0 -p 7777 -d -l 200000000 -g

contract('Scenario Test', (accounts) => {
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

  it("Register accounts[2] as Nam", async() => {
    await meta.register('Nam',24,0, {from: accounts[2]})
  })

  //post some tweets
  //id = 0
  it("Post 1st tweet from Alice", async() => {
    await meta.tweet('Such a beautiful day', {from: accounts[0]})
  })

  //id = 1
  it("Post 2nd tweet from Alice", async() => {
    await meta.tweet('Anyone wanna hangout on Friday?', {from: accounts[0]})
  })

  //id = 2
  it("Post 1st tweet from Bob", async() => {
    await meta.tweet('Testing how this works', {from: accounts[1]})
  })

  //id = 3
  it("Post 3rd tweet from Alice", async() => {
    await meta.tweet('Adulthood is a trap, kids', {from: accounts[0]})
  })

  //Nam comments on 1st tweet of Alice
  it("Comment on 1st tweet of Alice as Nam", async() => {
    await meta.comment(0, "It's raining hard on my end!!!", {from: accounts[2]})
  })

  //Bob comment on 3rd tweet of Alice
  it("Comment on 3rd tweet of Alice as Bob", async() => {
    await meta.comment(3, "Totally agree, do jobs pay bill", {from: accounts[1]})
  })

  //Nam comment on 3rd tweet of Alice
  it("Comment on 3rd tweet of Alice as Nam", async() => {
    await meta.comment(3, "And raise kids!", {from: accounts[2]})
  })

  //All comments on 2nd twwet of ALice
  it("Comment on 2nd tweet of Alice as Nam", async() => {
    await meta.comment(1, "Drop me the place and I'll be there", {from: accounts[2]})
  })

  it("Comment on 2nd tweet of Alice as Bob", async() => {
    await meta.comment(1, "I'll be there a little late but definitely", {from: accounts[1]})
  })

  it("Comment on 2nd tweet of Alice as Alice", async() => {
    await meta.comment(1, "Awesome! Let's meet at Kajoo club at 9pm", {from: accounts[0]})
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
    let posts = await meta.getTweets('Alice')
    console.log(posts)
  })

  it("Get tweets from Bob", async() => {
    let posts = await meta.getTweets('Bob')
    console.log(posts)
  })




})
