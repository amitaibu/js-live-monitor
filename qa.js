/**
 * Execute the tests, and if something fails, send it to the server.
 *
 * (currently it is just logged to the console)
 */
main = function() {
  runTests();
}

runTests = function() {
  loadJS('https://cdn.rawgit.com/amitaibu/js-live-monitor/77c40f0079b809f297082c1be2741375fde105e8/customTests.js', function() {
    result = customTests();
    result.forEach(function(row) {
      if (!!row.result()) {
        return;
      }

      console.error(row.id);
    });

    html2canvas(document.body, {
      onrendered: function(canvas) {
        var image = document.createElement('img');
        image.src = canvas.toDataURL("image/png");
        document.body.appendChild(image);
      }
    });
  });
}

function loadJS(src, callback) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onreadystatechange = s.onload = function() {
        var state = s.readyState;
        if (!callback.done && (!state || /loaded|complete/.test(state))) {
            callback.done = true;
            callback();
        }
    };
    document.getElementsByTagName('head')[0].appendChild(s);
}
