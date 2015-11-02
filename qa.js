/**
 * Execute the tests, and if something fails, send it to the server.
 *
 * (currently it is just logged to the console)
 */
main = function() {
  runTests();
}

runTests = function() {
  var errors = [];
  loadJS('http://localhost/shoov/www/js_lm/22', function() {
    result = customTests();
    result.forEach(function(row) {
      if (!!row.result()) {
        return;
      }

      errors.push(row.id);
    });

    var request = new XMLHttpRequest();

    var data = {
      build: 22,
      // url: '/',
      errors: errors.join("\r\n")
    };

    var serializeObject = function(obj) {
        var pairs = [];
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }
            pairs.push(prop + '=' + obj[prop]);
        }
        return pairs.join('&');
    }

    request.open('POST', 'http://localhost/shoov/www/api/v1.0/js-lm-incidents', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    request.onload = function() {
        if (request.status === 200) {
            console.log('ok');
        }
        else if (request.status !== 200) {
            console.log('Request failed.  Returned status of ' + request.status);
        }
    };

    request.send(encodeURI(serializeObject(data)));

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
