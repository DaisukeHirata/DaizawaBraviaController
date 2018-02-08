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

/*
PowerOn, hdmi1, hdmi2, hdmi3, hdmi4, Num1, Num2, Num3, Num4, Num5, Num6, Num7, Num8, Num9, Num0, Num11, Num12, Enter, GGuide, ChannelUp, ChannelDown, VolumeUp, VolumeDown, Mute, TvPower, Audio, MediaAudioTrack, Tv, Input, TvInput, TvAntennaCable, WakeUp, PowerOff, Sleep, Right, Left, SleepTimer, Analog2, TvAnalog, Display, Jump, PicOff, PictureOff, Teletext, Video1, Video2, AnalogRgb1, Home, Exit, PictureMode, Confirm, Up, Down, ClosedCaption, Component1, Component2, Wide, EPG, PAP, TenKey, BSCS, Ddata, Stop, Pause, Play, Rewind, Forward, DOT, Rec, Return, Blue, Red, Green, Yellow, SubTitle, CS, BS, Digital, Options, Media, Prev, Next, DpadCenter, CursorUp, CursorDown, CursorLeft, CursorRight, ShopRemoteControlForcedDynamic, FlashPlus, FlashMinus, DemoMode, Analog, Mode3D, DigitalToggle, DemoSurround, *AD, AudioMixUp, AudioMixDown, PhotoFrame, Tv_Radio, SyncMenu, Hdmi1, Hdmi2, Hdmi3, Hdmi4, TopMenu, PopUpMenu, OneTouchTimeRec, OneTouchView, DUX, FootballMode, iManual, Netflix, Assists, FeaturedApp, FeaturedAppVOD, GooglePlay, ActionMenu, Help, TvSatellite, WirelessSubwoofer, AndroidMenu
*/
const commandTable = {
  "つけ": "PowerOn",
  "オン": "PowerOn",
  "消し": "PowerOff",
  "オフ": "PowerOff",
  "上げ": "VolumeUp",
  "アップ": "VolumeUp",
  "下げ": "VolumeDown",
  "ダウン": "VolumeDown",
  "ミュート": "Mute",
  "DVD": "Video2"
};

firebase.initializeApp( config );

const path = "/googlehome";
const key = "word"
const db = firebase.database();
const ref = db.ref( path );

ref.on( "child_changed", function( changedSnapshot ) {
  const message = changedSnapshot.val().split(" ")[0];
  const command = commandTable[message];
  sendMessage( command );
  //firebase clear
  db.ref(path).set({[key]: ""});
});