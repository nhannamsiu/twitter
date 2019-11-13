pragma solidity 0.5.12;

pragma experimental ABIEncoderV2;

contract Twitter{

    //constants
    address NULL_ADDR = 0x0000000000000000000000000000000000000000;
    string NULL_STR = "";

    //Object models
    uint commentID;
    uint tweetID;

    struct userObj{
        string username;
        uint8 age;
        uint8 gender;
        uint[] posts;
    }

    struct tweetObj{
        uint date;
        string text;
        uint[] comments;
    }

    struct commentObj{
        string username;
        string text;
        uint date;
    }

    //database
    mapping(address=>string) getUsername;
    mapping(string=>address) getAddress;

    mapping(address=>userObj) users;
    mapping(uint=>tweetObj) tweets;
    mapping(uint=>commentObj) comments;

    //util functions
    function compareString(string memory a, string memory b) internal pure returns(bool){
       return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    function concatString(string memory a, string memory b, string memory c) internal pure returns(string memory){
        return string(abi.encodePacked(a,b,hex"0a",c));
    }

    //register
    function register(string memory username, uint8 age, uint8 gender) public{
        require(compareString(getUsername[msg.sender], NULL_STR), "You already registered");
        require(getAddress[username] == NULL_ADDR, "This username is unavailable");
        require(age>=18,"You must be at least 18 to use dTwitter");
        require(gender<3,"Invalid gender");

        //register new user
        getAddress[username] = msg.sender;
        getUsername[msg.sender] = username;
        users[msg.sender] = userObj(username,age,gender, new uint[](0));
    }

    //get profile
    function getProfile(string memory username) public view returns(userObj memory){
      address id = getAddress[username];
      require(id != NULL_ADDR, "Invalid username");

      return users[id];
    }

    //tweet
    function tweet(string memory text) public{
        tweets[tweetID] = tweetObj(now, text, new uint[](0));
        users[msg.sender].posts.push(tweetID);

        tweetID += 1;
    }

    //get tweets
    function getTweets(string memory username) public view returns(tweetObj[] memory){
        address user = getAddress[username];
        uint[] memory postIDs = users[user].posts;

        tweetObj[] memory result = new tweetObj[](postIDs.length);

        for (uint i=0; i<postIDs.length; i++){
            result[i] = tweets[postIDs[i]];
        }

        return result;
    }

    function comment(uint _postID, string memory text) public{
        comments[commentID] = commentObj(getUsername[msg.sender], text, now);
        tweets[_postID].comments.push(commentID);

        commentID += 1;
    }

    function getComments(uint _postID) public view returns(commentObj[] memory){
        uint[] memory commentIDs = tweets[_postID].comments;

        commentObj[] memory result = new commentObj[](commentIDs.length);

        for (uint i=0; i<commentIDs.length; i++){
            result[i] = comments[commentIDs[i]];
        }

        return result;
    }

    function retweet(string memory from, uint postIndex) public{
        address id = getAddress[from];
        uint[] memory postIDs = users[id].posts;
        tweetObj memory tweet = tweets[postIDs[postIndex]];

        string memory text = concatString("Retweet from: ", from, tweet.text);

        //add as new post
        tweets[tweetID] = tweetObj(now, text, new uint[](0));
        users[msg.sender].posts.push(tweetID);
        tweetID += 1;
    }

}
