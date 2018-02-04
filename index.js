var request = require('superagent');
var firebase = require("firebase");

function sendMessage( message ) {
  request.get('http://xxx.xxx.xxx.xxx:4000/' + message )
    .end((err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res.text);
      }
  });
}

var config = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxxxxxxxx",
  storageBucket: "",
  messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxx"
};  

firebase.initializeApp( config );

var db = firebase.database();
var ref = db.ref( "/googlehome" );

ref.on( "child_changed", function( changedSnapshot ) {
  var message = changedSnapshot.val();
  sendMessage( message );
});