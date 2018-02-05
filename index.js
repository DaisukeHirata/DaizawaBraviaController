var request = require('superagent');
var firebase = require("firebase");

function sendMessage( command ) {
  request
    .get('http://localhost:4000/' + command )
    .end((err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res.text);
      }
    });
}

const config = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxx-xxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxxxx-xxxxx.firebaseio.com",
  projectId: "xxxxxxxx-xxxxx",
  storageBucket: "",
  messagingSenderId: "xxxxxxxxxxxxxxxx"
};

const commandTable = {
  "つけ": "PowerOn",
  "オン": "PowerOn",
  "消し": "PowerOff",
  "オフ": "PowerOff",
  "上げ": "VolumeUp",
  "アップ": "VolumeUp",
  "下げ": "VolumeDown",
  "ダウン": "VolumeDown",
  "ミュート": "Mute"  
};

firebase.initializeApp( config );

const path = "/googlehome";
const key = "word"
var db = firebase.database();
var ref = db.ref( path );

ref.on( "child_changed", function( changedSnapshot ) {
  var message = changedSnapshot.val().split(" ")[0];
  const command = commandTable[message];
  sendMessage( command );
  //firebase clear
  db.ref(path).set({[key]: ""});
});