ga('create', 'UA-XXXXX-Y', 'auto');

ga(function(tracker) {

  // Grab a reference to the default sendHitTask function.
  var originalSendHitTask = tracker.get('sendHitTask');

  // Modifies sendHitTask to send a copy of the request to a local server after
  // sending the normal request to www.google-analytics.com/collect.
  tracker.set('sendHitTask', function(model) {
    originalSendHitTask(model);
    var xhr = new XMLHttpRequest();
    console.log('sendHitTask:', model.get('hitPayload') );
    xhr.open('POST', document.getElementById('gio_host_content').getAttribute('host-content'), true);
    xhr.send(model.get('hitPayload'));
  });
});

ga('send', 'pageview');

console.log('ga reload');