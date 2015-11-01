runTests = function() {
  return [
    {
      id: "it should find the add to cart button",
      result: true
    },
    {
      id: "it should find the title",
      result: false
    }
  ]
}

main = function() {
  result = runTests();
  result.forEach(function(row) {
    if (!!row.result) {
      return;
    }

    console.error(row.id);
  });
}
