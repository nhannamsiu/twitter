const Twitter = artifacts.require("Twitter.sol")

function print(s){
  console.log(s)
}

//ganache-cli -h 0.0.0.0 -p 7777 -d -l 200000000 -g

contract('Comment Test', (accounts) => {
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
  it("Post 1st tweet from Alice", async() => {
    await meta.tweet('Such a beautiful day', {from: accounts[0]})
  })

  it("Post 2nd tweet from Alice", async() => {
    await meta.tweet('Anyone wanna hangout on Friday?', {from: accounts[0]})
  })

  it("Post 3rd tweet from Alice", async() => {
    await meta.tweet('Adulthood is a trap, kids', {from: accounts[0]})
  })

  //comments something
  it("Comment on 2nd tweet of Alice as Nam", async() => {
    await meta.comment(1, "Drop me the place and I'll be there", {from: accounts[2]})
  })

  it("Comment on 2nd tweet of Alice as Bob", async() => {
    await meta.comment(1, "I'll be there a little late but definitely", {from: accounts[1]})
  })

  it("Comment on 2nd tweet of Alice as Alice", async() => {
    await meta.comment(1, "Awesome! Let's meet at Kajoo club at 9pm", {from: accounts[0]})
  })

  //get 2nd post
  it("Get tweets from Alice as Alice", async() => {
    let posts = await meta.getTweets('Alice')
    console.log(posts[1])
  })

  //get 2nd posts' comments
  it("Get comments on 2nd tweet of Alice", async() => {
    let postID = 1
    let comments = await meta.getComments(postID)
    console.log(comments)
  })






})
