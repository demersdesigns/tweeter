var viewModel = {
  appName: 'Tweeted',
  
  //logged in user bindings
  name: ko.observable(""),
  screen_name: ko.observable(""),
  friends_count: ko.observable(""),
  followers_count: ko.observable(""),
  statuses_count: ko.observable(""),
  profile_image_url: ko.observable(""),
  
  //follower user bindings
  userList: ko.observableArray([])
}
ko.applyBindings(viewModel);

//Return the 20 latest friends and populate the userList
getUserList = function(){
  $.getJSON('https://api.twitter.com/1/statuses/friends.json?screen_name=demersdesigns&count=20&callback=?', function(data){
    
    //Get latest data first
    var data = data.reverse();
    
    for(i=0, max=data.length; i<max; i++){
      //Shortcut so we don't have to write data[i] every time
      var content = data[i];
      
      //Clear out any existing data
      viewModel.userList([]);
      
      //Push data into array
      viewModel.userList.push({
        name: content.name,
        screen_name: content.screen_name,
        friends_count: content.friends_count,
        followers_count: content.followers_count,
        statuses_count: content.statuses_count,
        profile_image_url: content.profile_image_url
      });
    }
  });
}

//Return logged in user's information
//Since there is not a login/logout system in this demo, we hardcode the logged in user
getUserInfo = function(){
  $.getJSON('https://api.twitter.com/1/users/lookup.json?screen_name=demersdesigns&callback=?', function(data){

      var content = data[0];
      
      //Push loggeed in user data into model
        viewModel.name(content.name),
        viewModel.screen_name(content.screen_name),
        viewModel.friends_count(content.friends_count),
        viewModel.followers_count(content.followers_count),
        viewModel.statuses_count(content.statuses_count),
        viewModel.profile_image_url(content.profile_image_url)
  });
}

//Call the initial functions to get data into the model
getUserInfo();
getUserList();