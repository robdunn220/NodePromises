const fs = require('fs-promise');

var file1 = process.argv[2], file2 = process.argv[3], writeFile = process.argv[4], file1Array = {}, file2Array = {}, finalText = '', promise1 = fs.readFile(file1);

var promise2 = promise1.then(function(buffer) {
  var file1Contents = buffer.toString();
  file1Array = file1Contents.match(/[^\r\n]+/g);
  return fs.readFile(file2);
})
.catch(function(err) {
  console.log('Error: ', err.message);
});

var writeToFile = promise2.then(function(buffer) {
  var file2Contents = buffer.toString();
  file2Array = file2Contents.match(/[^\r\n]+/g);
  var finalArr = combineThem(file1Array, file2Array);
  return fs.writeFile(writeFile, finalText);
})
.catch(function(err) {
  console.log('Error: ', err.message);
});

var combineThem = function(firstArray, secondArray) {
  var x = 0;
  var n = 0;
  var arrLength = (firstArray.length + secondArray.length);
  for (var i = 0; i < arrLength; i++) {
    if (i%2 === 0) {
      finalText += (firstArray[n] + '\n');
      n++;
    }
    else if (i%2) {
      finalText += (secondArray[x] + '\n');
      x++;
    }
  }
  return finalText;
};
