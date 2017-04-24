app.filter('searchFor', function () {
  return function (arr, searchString) {
    if (!searchString) {
      return arr;
    }
    var result = [];
    searchString = searchString.toLowerCase();
    angular.forEach(arr, function (item) {
      if (item.title.toLowerCase().indexOf(searchString) !== -1) {
        result.push(item);
      }
    });
    return result;
  };
});

app.filter('camelCaseToSpace', function () {
  return function (str) {
    return str
      .replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();})
      .split('_').join(' ');
  };
});