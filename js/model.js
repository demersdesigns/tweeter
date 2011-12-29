var userList = [
{name: 'John Cleese', twitterName: 'JohnCleese'},
{name: 'MC Hammer', twitterName: 'MCHammer'},
{name: 'Stephen Fry', twitterName: 'StephenFry'},
{name: 'Al Gore', twitterName: 'algore'},
{name: 'Steven Sanderson', twitterName: 'StevenSanderson'}
];

var viewModel = {
  appName: 'Tweeted',
  
  //logged in user bindings
  username: ko.observable(""),
  propername: ko.observable(""),
  avatar: ko.observable(""),
  joinedDate: ko.observable(""),
  tweetCount: ko.observable(""),
  followerCount: ko.observable(""),
  followingCount: ko.observable(""),
  latestTweets: ko.observableArray([]),
  
  //follower user bindings
  userList: ko.observableArray(userList),
  selectedUser: ko.observable([]),
  userLatestTweets: ko.observableArray([])
};  
ko.applyBindings(viewModel);