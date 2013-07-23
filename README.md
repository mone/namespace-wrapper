# Namespace Wrapper #

This simple node application will wrap an JavaScript library written using AMD and compressed using r.js into a configurable namespace

## The Problem ##

Imagine you have a compressed JavaScript library, named library1.js, defining the Foo and Bar modules you would use it like this:

```
<script src="require.js"></script>
<script src="library1.js"></script>
<script>
  require(["Foo","Bar"],function(Foo,Bar) {
    //do stuff
  });
</script>
```

Now you want introduce a new functionality from library2.js. Unfortunately this library also define two modules named Foo and Bar.
This will obviously not work:
```
<script src="require.js"></script>
<script src="library1.js"></script>
<script src="library2.js"></script>
<script>
  require(["Foo","Bar","Foo","Bar"],function(Foo,Bar,Foo,Bar) {
    //do stuff
  });
</script>
```

## The Solution ##

The solution would be to be able to refer to the modules of library1.js as library1/Foo and library1/Bar while referring to the modules of library2 using library2/Foo and library2/Bar
```
<script src="require.js"></script>
<script src="library1.js"></script>
<script src="library2.js"></script>
<script>
  require(["library1/Foo","library1Bar","library2/Foo","library2/Bar"],function(Foo1,Bar1,Foo2,Bar2) {
    //do stuff
  });
</script>
```

## Usage ##

The process requires node.js to run so be sure to have it installed on the used machine.

Install the requirejs using npm:
```
npm install requirejs
```

run the wrapper
```
node namespace-wrapper.js NAMESPACE ORIGINAL_LIBRARY_FILE TARGET_WRAPPED_LIBRARY_FILE
```

TARGET_WRAPPED_LIBRARY_FILE will contain the namespaced library.

## Missing Features ##

I wrote the wrapper with a specific goal in mind so that some feautures that were not needed were not taken into account. Here are its current shortcomings:

*    The library to be wrapped MUST never uses the require method inside it but only the define one
*    The library to be wrapped CAN only refer to other modules defined inside itself. If reference to a second library are contained the second library must be wrapped with the same namespace.