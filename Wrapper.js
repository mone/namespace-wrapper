define([],function() {

  function getHead(namespace) {
    return "(function(o) {var l='"+namespace+"/';var define = function(c,a,d){for(var b=0;b<a.length;b++)a[b]=l+a[b];o(l+c,a,d)};";
  }
  var foot = "})(define);";
  
  return {
    wrap: function(namespace,libAsString) {
      return getHead(namespace)+libAsString+foot;
    }
  }


});