//A little mojo to ensure that the scaling is adjusted when the iPhone or iPad changes orientation */
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
  var viewportmeta = document.querySelector('meta[name="viewport"]');
  if (viewportmeta) {
    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
    document.body.addEventListener('gesturestart', function () {
      viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    }, false);
  }
}

$(function(){
  $(".fancybox").fancybox({
    autoSize: false,
    width: '50%',
    height: '50%'
  });
});




