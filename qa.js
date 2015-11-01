/**
 * Our custom, unique to site tests.
 */
runTests = function() {
  return [
    {
      id: "it should find the a visible add to cart link",
      result: function() {
        var element = document.querySelector('a.cart');
        return !!element && element.offsetParent !== null;
      }
    },
    {
      id: "it should find a visible title",
      result: function() {
        var element = document.querySelector('h1');
        return !!element && element.offsetParent !== null;
      }
    }
  ]
}

/**
 * Execute the tests, and if something fails, send it to the server.
 *
 * (currently it is just logged to the console)
 */
main = function() {
  result = runTests();
  result.forEach(function(row) {
    if (!!row.result()) {
      return;
    }

    console.error(row.id);
  });
}
