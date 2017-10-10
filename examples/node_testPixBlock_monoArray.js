const pixbincodec = require("../dist/pixbincodec.cjs.js");

var simpleObject = {
  _data: getlargeTypedArray(100000),
  _metadata: {
    firstname: "john",
    lastname: "Doe",
    date: new Date()
  }
}

var blockEncoder = new pixbincodec.PixBlockEncoder();
blockEncoder.enableDataCompression( true );
blockEncoder.setInput(simpleObject)
blockEncoder.run();

// this buffer is a binary-serialized version of simpleObject
var simpleBuff = blockEncoder.getOutput();
console.log("encoded buffer size: " + simpleBuff.byteLength );

var blockDecoder = new pixbincodec.PixBlockDecoder();
blockDecoder.setInput( simpleBuff )
blockDecoder.run();

var simpleObjectDecoded = blockDecoder.getOutput();

console.log("original:");
console.log(simpleObject);
console.log("encoded/decoded:");
console.log( simpleObjectDecoded );

// generating an array with values that are close to each other
// (like when using a weighted sine function) will give better compression result
function getlargeTypedArray( size ){
  var arr = new Int32Array( size );
  for(var i=0; i<size; i++){
    //arr[i] = Math.random() * 100;
    arr[i] = Math.sin( i/100 ) * 100;
  }
  
  return arr;
}
