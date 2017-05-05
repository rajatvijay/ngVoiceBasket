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

app.filter('removeDoubleUnderscores', function () {
  return function (str) {
    return str
      .split('_')
      .slice(1)
      .join('_');
  };
});

app.filter('toArray', function() { return function(obj) {
  if (!(obj instanceof Object)) return obj;
  return _.map(obj, function(val, key) {
    return Object.defineProperty(val, '$key', {__proto__: null, value: key});
  });
}});

