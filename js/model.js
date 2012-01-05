/* Set the bindings for the UI */
var viewModel = {

  /* Logged In User Bindings */
  loggedIn_name: ko.observable(""),
  loggedIn_screen_name: ko.observable(""),
  loggedIn_profile_image_url: ko.observable(""),
  loggedIn_followers_count: ko.observable(""),
  loggedIn_friends_count: ko.observable(""),
  loggedIn_statuses_count: ko.observable(""),
  
  /* User List Bindings */
  userList: ko.observableArray([]),
  currentUser: ko.observable(),
  latestTweets: ko.observableArray([]),
  
  /* Current User Bindings */
  current_name: ko.observable(""),
  current_screen_name: ko.observable(""),
  current_profile_image_url: ko.observable(""),
  current_followers_count: ko.observable(""),
  current_friends_count: ko.observable(""),
  current_statuses_count: ko.observable("")
};

/* Get Knockout.js running. */
ko.applyBindings(viewModel);

/* Return the 20 latest friends and populate the userList */
var getUserList = function(){
  //console.info('Fetching User List');
  $.getJSON('/js/json/friends.json', function(data){
    viewModel.userList(data);
    
    /* Set the current user to the first user in the list */
    viewModel.currentUser(viewModel.userList()[0].screen_name);
  });
};

/*
* Return logged in user's information
* Since there is not a login/logout system in this demo, we hardcode the logged in user
*/
var getLoggedInUser = function(){
  //console.info('Fetching The Logged In User');
  $.getJSON('/js/json/lookup.json', function(data){
    
    var content = data[0];
    
    /* Populate the observables */
    viewModel.loggedIn_name(content.name);
    viewModel.loggedIn_screen_name(content.screen_name);
    viewModel.loggedIn_profile_image_url(content.profile_image_url);
    viewModel.loggedIn_followers_count(content.followers_count);
    viewModel.loggedIn_friends_count(content.friends_count);
    viewModel.loggedIn_statuses_count(content.statuses_count);
  });
};

/*
* When the app user clicks on a name in the userList, the currentUser observable
* is updated with that user's screen name. 
*/
var setScreenName = function(screenName, event) {
  viewModel.currentUser(screenName);
  
  /* Set the active state when the user clicks on one of the items in the userList. */
  $('.users').find('.active').removeClass('active');
  $(event.currentTarget).addClass('active');
};

/*
* When the currentUser is set via the setScreenName function called by clicking on a user in the userlist, load the 20
* latest tweets for that user into the latestTweets() observable array.
*/
var getLatestTweets = ko.computed(function(){
  //console.info('Fetching Selected User Latest Tweets');
  if(this.currentUser()){
      var currentUser = this.currentUser();
      
      $.getJSON('/js/json/user_timeline_'+ currentUser +'.json', function(data){
          viewModel.latestTweets(data);
          
        var currentUserInfo = data[0].user;
        
        /* Populate the observables */
        viewModel.current_name(currentUserInfo.name);
        viewModel.current_screen_name(currentUserInfo.screen_name);
        viewModel.current_profile_image_url(currentUserInfo.profile_image_url);
        viewModel.current_followers_count(currentUserInfo.followers_count);
        viewModel.current_friends_count(currentUserInfo.friends_count);
        viewModel.current_statuses_count(currentUserInfo.statuses_count);
      });
  }
},viewModel);

var setInitialActive = ko.computed(function() {
  if(viewModel.userList()){
    $('.user_list ul.users li:first').addClass("active");
  }
});

/* Call the initial functions to get data into the model */
getLoggedInUser();
getUserList();