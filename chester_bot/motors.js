"use strict";
const five = require("johnny-five");
const Tessel = require("tessel-io");
const board = new five.Board({
  io: new Tessel()
});
const motors = new five.Motors([
  // Left Motor
  { pins: { pwm: "a5", dir: "a4", cdir: "a3" } },
  // Right Motor
  { pins: { pwm: "b5", dir: "b4", cdir: "b3" } },
]);

var motorRun = function(motion, power){
    // Johnny-Five's `Motors` collection class allows
  // us to control multiple motors at once.
  var isOn = power
  let direction = motion
  let speed = 1;

  function accelerate() {
      speed = 50;
      motors[direction](speed);
  }
  if(isOn){
accelerate()
  }else{
    motors.stop()
  }
};
module.exports = motorRun