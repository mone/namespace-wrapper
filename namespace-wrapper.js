/*
Copyright 2013 Weswit s.r.l.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/   

//setup require.js
var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require
});

//read parameters from command line
if (process.argv.length < 5) { 
  console.error("Missing parameters");
  process.exit(1);
}
var namespace;
var origFile;
var targetFile;
process.argv.forEach(function (val, index, array) {
  if (index <= 1) {
    return;
  } else if (index == 2) {
    namespace = val;
  } else if (index == 3) {
    origFile = val;
  } else if (index == 4) {
    targetFile = val;
  } 
});

requirejs(["Wrapper"], 
  function(Wrapper) {
  
  
  //1 read lib from file
  var fs = require('fs');
  fs.readFile(origFile, function(err,data){
    if(err) {
      console.error("Could not open lib file: " + origFile + "\n" + err);
      process.exit(1);
    }
    
    data = String(data); //otherwise data has no indexOf method
    
    //wrap lib
    var libOutput = Wrapper.wrap(namespace,data);
    
    //write on output file
    fs.writeFile(targetFile, libOutput, function(err) {
      if(err) {
        console.log("Could not write file: " + targetFile + "\n" + err);
        process.exit(1);
      } else {
        console.log("The file was saved: " + targetFile);
        process.exit(0);
      }
    }); 

  });
  
});