# Chesters Adventure

[![Node.js](https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg)](https://nodejs.org/en/)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Chester is a robot that allows for a pilot to connect to it as an access point, the controls are hosted as an http server in the robot.

  - Chester composes of a tessel 2 platform running on the Johnny-Five api
  - Johnny-Five allows you to interpret data to the mechanical components of chester through the controller chip and js logic
  - Chesters controls are hosted in a http server that runs on the tessel 2 board

# Hardware:

 -<dd><a href="https://www.sparkfun.com/products/13841"><img width="58" height="58" class="sfe-thumbnail" src="https://cdn.sparkfun.com/r/58-58/assets/parts/1/1/4/4/6/Tessel_2_Cable_-02.jpg"><span class="sfe-text"><span class="sfe-item-title">Tessel 2 <span class="sfe-sku"><span class="sfe-stock sfe-stock-in" title="in stock"></span> DEV-13841</span></span><span class="sfe-description">The Tessel 2 is a development board with on-board WiFi capabilities that allows you to build scripts in Node.js. This Tessel provides you with a conne…</span></span></a></dd>
 -<dd><a href="https://www.sparkfun.com/products/13301"><img width="58" height="58" class="sfe-thumbnail" src="https://cdn.sparkfun.com/r/58-58/assets/parts/1/0/5/6/0/13301-Action01.jpg"><span class="sfe-text"><span class="sfe-item-title">Shadow Chassis <span class="sfe-sku"><span class="sfe-stock sfe-stock-in" title="in stock"></span> ROB-13301</span></span><span class="sfe-description">The Shadow Chassis is a marvelously durable and modular robot platform from RobotZone. The chassis plates and mounts are cut from ABS plastic and util…</span></span></a></dd>
 -<dd><a href="https://www.sparkfun.com/products/13259?_ga=2.268742837.59150256.1554596304-221217038.1554596304"><img width="58" height="58" class="sfe-thumbnail" src="https://cdn.sparkfun.com/r/58-58/assets/parts/1/0/4/6/3/13259-03.jpg"><span class="sfe-text"><span class="sfe-item-title">Wheel - 65mm (Rubber Tire, Pair) <span class="sfe-sku"><span class="sfe-stock sfe-stock-in" title="in stock"></span> ROB-13259</span></span><span class="sfe-description">These are a pair of basic, 65mm wheels with black rubber tires. These wheels are the same ones designed to fit onto DAGUs right angle gear motors util…</span></span></a></dd>
 -<dd><a href="https://www.sparkfun.com/products/12002"><img width="58" height="58" class="sfe-thumbnail" src="https://cdn.sparkfun.com/r/58-58/assets/parts/8/5/0/3/12002-04.jpg"><span class="sfe-text"><span class="sfe-item-title">Breadboard - Self-Adhesive (White) <span class="sfe-sku"><span class="sfe-stock sfe-stock-in" title="in stock"></span> PRT-12002</span></span><span class="sfe-description">This is your tried and true white solderless breadboard. It has 2 power buses, 10 columns, and 30 rows - a total of 400 tie in points. All pins are sp…</span></span></a></dd>
 <dd><a href="https://www.sparkfun.com/products/11709"><img width="58" height="58" class="sfe-thumbnail" src="https://cdn.sparkfun.com/r/58-58/assets/parts/7/8/9/2/11709-01.jpg"><span class="sfe-text"><span class="sfe-item-title">Jumper Wires Premium 6" M/M - 20 AWG (10 Pack) <span class="sfe-sku"><span class="sfe-stock sfe-stock-in" title="in stock"></span> PRT-11709</span></span><span class="sfe-description">Jumper wires are awesome. Just a little bit of stranded core wire with a nice solid pin connector on either end. They have the flexibility of stranded…</span></span></a> <p>2 packs</p></dd>
 <dd><a href="https://www.sparkfun.com/products/14450"><img width="58" height="58" class="sfe-thumbnail" src="https://cdn.sparkfun.com/r/58-58/assets/parts/1/2/4/8/2/14450a-01.jpg"><span class="sfe-text"><span class="sfe-item-title">SparkFun Motor Driver - Dual TB6612FNG (with Headers) <span class="sfe-sku"><span class="sfe-stock sfe-stock-in" title="in stock"></span> ROB-14450</span></span><span class="sfe-description">The TB6612FNG Motor Driver can control up to two DC motors at a constant current of 1.2A (3.2A peak). Two input signals (IN1 and IN2) can be used to c…</span></span></a></dd>



You'll also need:
  - A power bank with 8000 mAh minimum
  

You can find the guide used to make this robot down bellow:

> <a href='https://learn.sparkfun.com/tutorials/reconbot-with-the-tessel-2?_ga=2.57253162.1417887474.1553348867-1180849211.1553348867#materials'> ReconBot with Tessel 2</a>



### Code

The code had to be modified to fit some of the criterias needed. To start the motor.js file used to be a test code for the robots motors, it was changed so that the motorRun function could recieve logical output from the server.js file and translate it in to a direction and boolean for if to power on or not. 
```
//Original:
board.on("ready", () => {
  // Johnny-Five's `Motors` collection class allows
  // us to control multiple motors at once.
  const motors = new five.Motors([
    // Left Motor
    { pins: { pwm: "a5", dir: "a4", cdir: "a3" } },
    // Right Motor
    { pins: { pwm: "b5", dir: "b4", cdir: "b3" } },
  ]);
  let direction = "forward"
  let speed = 0;

  function accelerate() {
    if (speed <= 255) {
      speed += 5;
      motors[direction](speed);
      board.wait(200, accelerate);
    } else {
      flipMotorDirection();
    }
  }

  function flipMotorDirection() {
    motors.stop();
    board.wait(1000, () => {
      speed = 0;
      direction = direction === "reverse" ? "forward" : "reverse";
      console.log(`Running motors in ${direction} direction`);
      accelerate();
    });
  }
  flipMotorDirection();
});

//New:
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
```


### Installation

go down to this sub directory path Project2_Grouop2/Project2_Grouop2/chester_bot

Install the dependencies and devDependencies and start the server.

```
$ npm install

```
- Install t2-cli as a global dependency

```
$ npm install -g t2-cli



### Plugins

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| Github | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |


### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma test
```
#### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```
### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
docker build -t joemccann/dillinger:${package.json.version} .
```
This will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:${package.json.version}
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

#### Kubernetes + Google Cloud

See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)


### Todos

 - Write MORE Tests
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
