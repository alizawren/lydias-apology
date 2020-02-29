// native HTML/JS elements

let loadBox = document.createElement("div");
loadBox.style.position = "absolute";
loadBox.style.top = `${0.5 * window.innerHeight - 10}px`;
loadBox.style.left = `${0.5 * window.innerWidth - 100}px`;
loadBox.style.width = "200px";
loadBox.style.height = "20px";
loadBox.style.zIndex = 100;
loadBox.style.borderStyle = "solid";
loadBox.style.borderWidth = "1px";
loadBox.style.borderColor = "#fff";
document.body.appendChild(loadBox);

let loadBar = document.createElement("div");
loadBar.style.backgroundColor = "#fff";
loadBar.style.position = "absolute";
loadBar.style.top = `${0.5 * window.innerHeight - 8}px`;
loadBar.style.left = `${0.5 * window.innerWidth - 98}px`;
loadBar.style.width = 0;
loadBar.style.height = "16px";
loadBar.style.zIndex = 100;
document.body.appendChild(loadBar);

let loadingText = document.createElement("div");
loadingText.innerText = "Welcome.";
loadingText.style.color = "#fff";
loadingText.style.position = "absolute";
loadingText.style.top = `${0.5 * window.innerHeight - 50}px`;
loadingText.style.left = `${0.5 * window.innerWidth - 100}px`;
loadingText.style.width = "200px";
loadingText.style.height = "20px";
loadingText.style.fontSize = "24px";
loadingText.style.fontFamily = "Source Sans Pro";
loadingText.style.textAlign = "center";
loadingText.style.zIndex = 100;
document.body.appendChild(loadingText);

let littleBear = document.createElement("img");
littleBear.src = "img/littlebear.png";
littleBear.style.position = "absolute";
littleBear.style.top = `${0.5 * window.innerHeight - 25}px`;
littleBear.style.left = `${0.5 * window.innerWidth - 25 - 100}px`;
littleBear.style.width = "50px";
littleBear.style.height = "50px";
littleBear.style.zIndex = 100;
document.body.appendChild(littleBear);

let tdInput = document.createElement("input");
tdInput.setAttribute("type", "text");
tdInput.style.position = "absolute";
tdInput.style.zIndex = 100;
tdInput.style.display = "none";
tdInput.style.top = "400px";
tdInput.style.left = "500px";
tdInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    validateInput("td", tdInput.value);
  }
});
document.body.appendChild(tdInput);

let mb1Input = document.createElement("input");
mb1Input.setAttribute("type", "text");
mb1Input.style.position = "absolute";
mb1Input.style.zIndex = 100;
mb1Input.style.display = "none";
mb1Input.style.top = "400px";
mb1Input.style.left = "100px";
mb1Input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    validateInput("mb1", mb1Input.value);
  }
});
document.body.appendChild(mb1Input);

let mb2Input = document.createElement("input");
mb2Input.setAttribute("type", "text");
mb2Input.style.position = "absolute";
mb2Input.style.zIndex = 100;
mb2Input.style.display = "none";
mb2Input.style.top = "400px";
mb2Input.style.left = "300px";
mb2Input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    validateInput("mb2", mb2Input.value);
  }
});
document.body.appendChild(mb2Input);

let mb3Input = document.createElement("input");
mb3Input.setAttribute("type", "text");
mb3Input.style.position = "absolute";
mb3Input.style.zIndex = 100;
mb3Input.style.display = "none";
mb3Input.style.top = "400px";
mb3Input.style.left = "500px";
mb3Input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    validateInput("mb3", mb3Input.value);
  }
});
document.body.appendChild(mb3Input);

let mb4Input = document.createElement("input");
mb4Input.setAttribute("type", "text");
mb4Input.style.position = "absolute";
mb4Input.style.zIndex = 100;
mb4Input.style.display = "none";
mb4Input.style.top = "400px";
mb4Input.style.left = "700px";
mb4Input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    validateInput("mb4", mb4Input.value);
  }
});
document.body.appendChild(mb4Input);

let convoHolder = document.createElement("div");
convoHolder.classList.add("convo");
convoHolder.style.background = "#fff";
convoHolder.style.position = "absolute";
convoHolder.style.display = "none";
convoHolder.style.zIndex = 100;
convoHolder.style.padding = "10px";
convoHolder.style.flexDirection = "column";
convoHolder.style.alignItems = "stretch";
convoHolder.style.overflowY = "scroll";
document.body.appendChild(convoHolder);

////////////////////////////

// Constants
const ROOM_IMG_WIDTH = 2560;
const ROOM_IMG_HEIGHT = 1440;

const PHONE_SCREEN_WIDTH = 1080;
const PHONE_SCREEN_HEIGHT = 1920;

const PHONE_SPEED = 250;

////////////////////////////

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

// get rid of audio context warnings
PIXI.utils.sayHello(
  "Welcome! Not everything is as it seems. You are rendering: " + type
);
console.log(
  "Forgive the above warnings; preloading sounds triggers the creation of AudioContexts, but it helps load sounds faster! Signed, ♅"
);

//Aliases
let Application = PIXI.Application,
  loader = PIXI.Loader.shared,
  resources = PIXI.Loader.shared.resources,
  Sprite = PIXI.Sprite,
  AnimatedSprite = PIXI.AnimatedSprite,
  Graphics = PIXI.Graphics,
  Container = PIXI.Container,
  Text = PIXI.Text,
  Sound = PIXI.sound.Sound;

//Create a Pixi Application
let app = new Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1,
  interactive: true
});

createjs.Ticker.timingMode = createjs.Ticker.RAF;

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", resize);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
loader
  // images
  .add("img/room.png")
  .add("img/aSimpleSquare.png")
  .add("img/redSquare.png")
  .add("img/greenSquare.png")
  .add("img/phoneScreen.png")
  .add("img/wren.png")
  .add("img/cardprinter.png")
  .add("img/cardprinter1.png")
  .add("img/cardprinter2.png")
  .add("img/cardprinter3.png")
  // .add("img/stereogram.jpg")
  .add("img/magic eye.png")
  .add("img/cpb.png")
  .add("img/cpbpressed.png")
  .add("img/boxopen.png")
  .add("img/boxclose.png")
  .add("img/tdcase.png")
  .add("img/td.png")
  .add("img/tdman.png")
  .add("img/tube11.png")
  .add("img/tube12.png")
  .add("img/tube13.png")
  .add("img/tube14.png")
  .add("img/tube21.png")
  .add("img/tube22.png")
  .add("img/tube23.png")
  .add("img/tube24.png")
  .add("img/tube31.png")
  .add("img/tube32.png")
  .add("img/tube33.png")
  .add("img/tube34.png")
  .add("img/tube41.png")
  .add("img/tube42.png")
  .add("img/tube43.png")
  .add("img/tube44.png")
  .add("img/word11.png")
  .add("img/word12.png")
  .add("img/word21.png")
  .add("img/word22.png")
  .add("img/word31.png")
  .add("img/word32.png")
  .add("img/lamp1off.png")
  .add("img/lamp1on.png")
  .add("img/lamp2off.png")
  .add("img/lamp2on.png")
  .add("img/lamp3off.png")
  .add("img/lamp3on.png")
  .add("img/lampoffbutton.png")
  .add("img/lamponbutton.png")
  .add("img/witch.png")
  .add("img/witchbutton.png")
  .add("img/tdmancover.png")
  .add("img/slide11.png")
  .add("img/slide12.png")
  .add("img/slide21.png")
  .add("img/slide22.png")
  .add("img/slide31.png")
  .add("img/slide32.png")
  .add("img/comic.png")
  .add("img/symbolsbook.png")
  .add("img/binarybook.png")
  // text
  .add("json/text.json")
  .add("json/convos.json")
  // sound
  .add("sound/streets radiofied.wav")
  .add("sound/sino radiofied.wav")
  .add("sound/paadoxical radiofied.wav")
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {
  //Display the file `url` currently being loaded
  // console.log("loading: " + resource.url);

  //Display the percentage of files currently loaded
  // console.log("progress: " + loader.progress + "%");

  loadBar.style.width = `${(loader.progress / 100) * 196}px`;
  littleBear.style.left = `${0.5 * window.innerWidth -
    25 -
    100 +
    2 * loader.progress}px`;
}

let roomWidth = ROOM_IMG_WIDTH;
let roomHeight = ROOM_IMG_HEIGHT;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let room,
  bg,
  tdkp,
  td,
  magicbox,
  witch,
  radio,
  bookOfSymbols,
  binaryBook,
  comicBook,
  box,
  tube1,
  tube2,
  tube3,
  tube4,
  cardPrinter,
  light,
  card1,
  card2,
  card3,
  slide1,
  slide2,
  slide3,
  magiceye,
  card;
let chosenCards = [];
let gui, phone, phoneGui, settingsButton;
let bgm;
let slide1drag = false;
let slide2drag = false;
let slide3drag = false;
let carddrag = false;
let lightOn = false;
let lightIndex = 0;
let busy = false;
let stopPan = false;

//This `setup` function will run when the image has loaded
function setup() {
  document.body.removeChild(loadBox);
  document.body.removeChild(loadBar);
  document.body.removeChild(loadingText);
  document.body.removeChild(littleBear);

  bgm = resources["sound/streets radiofied.wav"].sound;
  bgm.loop = true;

  room = new Container();
  room.x = 0;
  room.y = 0;
  if (windowWidth / windowHeight > 16 / 9) {
    roomWidth = 1.1 * windowWidth;
    roomHeight = (9 * roomWidth) / 16;
  } else {
    roomHeight = 1.1 * windowHeight;
    roomWidth = (16 * roomHeight) / 9;
  }

  bg = new Sprite(resources["img/room.png"].texture);

  let temptexture = [
    resources["img/tdcase.png"].texture,
    resources["img/td.png"].texture
  ];
  // td = new Sprite(resources["img/aSimpleSquare.png"].texture);
  td = new AnimatedSprite(temptexture);
  td.x = 1277;
  td.y = 373;
  td.interactive = true;

  tdkp = new Sprite(resources["img/aSimpleSquare.png"].texture);
  tdkp.x = 1312;
  tdkp.y = 560;
  tdkp.interactive = true;
  tdkp.cursor = "pointer";
  tdkp.on("mousedown", function() {
    if (!busy) {
      openGui("tdkp");
    }
  });

  tdman = new Sprite(resources["img/tdmancover.png"].texture);
  tdman.x = 1309;
  tdman.y = 686;
  tdman.interactive = true;
  tdman.cursor = "pointer";
  tdman.on("mousedown", function() {
    if (!busy) {
      openGui("tdman");
    }
  });

  magicbox = new Sprite(resources["img/aSimpleSquare.png"].texture);
  magicbox.x = 160;
  magicbox.y = 320;
  magicbox.interactive = true;
  magicbox.cursor = "pointer";
  magicbox.on("mousedown", function() {
    if (!busy) {
      openGui("mb");
    }
  });

  witch = new Sprite(resources["img/witchbutton.png"].texture);
  witch.x = 886;
  witch.y = 682;
  witch.interactive = true;
  witch.cursor = "pointer";
  witch.on("mousedown", function() {
    if (!busy) {
      openGui("witch");
    }
  });

  radio = new Sprite(resources["img/aSimpleSquare.png"].texture);
  radio.x = 752;
  radio.y = 720;
  radio.interactive = true;
  radio.cursor = "pointer";
  radio.on("mousedown", function() {
    if (!bgm.isPlaying) {
      bgm.play();
    } else {
      bgm.volume = 1 - bgm.volume;
    }
  });

  binaryBook = new Sprite(resources["img/binarybook.png"].texture);
  binaryBook.x = 937;
  binaryBook.y = 379;
  binaryBook.interactive = true;
  binaryBook.cursor = "pointer";
  binaryBook.on("mousedown", function() {
    if (!busy) {
      openGui("bb");
    }
  });

  bookOfSymbols = new Sprite(resources["img/symbolsbook.png"].texture);
  bookOfSymbols.x = 847;
  bookOfSymbols.y = 360;
  bookOfSymbols.interactive = true;
  bookOfSymbols.cursor = "pointer";
  bookOfSymbols.on("mousedown", function() {
    if (!busy) {
      openGui("bos");
    }
  });

  comicBook = new Sprite(resources["img/comic.png"].texture);
  comicBook.x = 810;
  comicBook.y = 389;
  comicBook.interactive = true;
  comicBook.cursor = "pointer";
  comicBook.on("mousedown", function() {
    if (!busy) {
      openGui("cb");
    }
  });

  const boxTexture = [
    resources["img/boxclose.png"].texture,
    resources["img/boxopen.png"].texture
  ];
  box = new AnimatedSprite(boxTexture);
  box.x = 1182;
  box.y = 930;
  box.interactive = true;
  box.cursor = "pointer";
  box.on("mousedown", function() {
    if (!busy) {
      box.gotoAndStop((box.currentFrame + 1) % box.totalFrames);
    }
  });

  const tube1texture = [
    resources["img/tube11.png"].texture,
    resources["img/tube12.png"].texture,
    resources["img/tube13.png"].texture,
    resources["img/tube14.png"].texture
  ];

  tube1 = new AnimatedSprite(tube1texture);
  tube1.x = 216;
  tube1.y = 598;
  tube1.interactive = true;
  tube1.cursor = "pointer";
  tube1.gotoAndStop(Math.floor(Math.random() * 4));
  tube1.on("mousedown", function() {
    if (!busy) {
      tube1.gotoAndStop((tube1.currentFrame + 1) % tube1.totalFrames);
    }
  });

  const tube2texture = [
    resources["img/tube21.png"].texture,
    resources["img/tube22.png"].texture,
    resources["img/tube23.png"].texture,
    resources["img/tube24.png"].texture
  ];

  tube2 = new AnimatedSprite(tube2texture);
  tube2.x = 260;
  tube2.y = 600;
  tube2.interactive = true;
  tube2.cursor = "pointer";
  tube2.gotoAndStop(Math.floor(Math.random() * 4));
  tube2.on("mousedown", function() {
    if (!busy) {
      tube2.gotoAndStop((tube2.currentFrame + 1) % tube2.totalFrames);
    }
  });

  const tube3texture = [
    resources["img/tube31.png"].texture,
    resources["img/tube32.png"].texture,
    resources["img/tube33.png"].texture,
    resources["img/tube34.png"].texture
  ];

  tube3 = new AnimatedSprite(tube3texture);
  tube3.x = 304;
  tube3.y = 602;
  tube3.interactive = true;
  tube3.cursor = "pointer";
  tube3.gotoAndStop(Math.floor(Math.random() * 4));
  tube3.on("mousedown", function() {
    if (!busy) {
      tube3.gotoAndStop((tube3.currentFrame + 1) % tube3.totalFrames);
    }
  });

  const tube4texture = [
    resources["img/tube41.png"].texture,
    resources["img/tube42.png"].texture,
    resources["img/tube43.png"].texture,
    resources["img/tube44.png"].texture
  ];

  tube4 = new AnimatedSprite(tube4texture);
  tube4.x = 348;
  tube4.y = 604;
  tube4.interactive = true;
  tube4.cursor = "pointer";
  tube4.gotoAndStop(Math.floor(Math.random() * 4));
  tube4.on("mousedown", function() {
    if (!busy) {
      tube4.gotoAndStop((tube4.currentFrame + 1) % tube4.totalFrames);
    }
  });

  cardPrinter = new Sprite(resources["img/aSimpleSquare.png"].texture);
  cardPrinter.x = 1760;
  cardPrinter.y = 720;
  cardPrinter.interactive = true;
  cardPrinter.cursor = "pointer";
  cardPrinter.on("mousedown", function() {
    if (!busy) {
      openGui("cp");
    }
  });

  const lighttexture = [
    resources["img/lamp1off.png"].texture,
    resources["img/lamp2off.png"].texture,
    resources["img/lamp3off.png"].texture,
    resources["img/lamp1on.png"].texture,
    resources["img/lamp2on.png"].texture,
    resources["img/lamp3on.png"].texture
  ];
  // light = new Sprite(resources["img/aSimpleSquare.png"].texture);
  light = new AnimatedSprite(lighttexture);
  light.x = 2172;
  light.y = 556;
  light.interactive = true;
  light.cursor = "pointer";
  light.on("mousedown", function() {
    if (!busy) {
      lightIndex = (lightIndex + 1) % 3;
      if (lightOn) {
        light.gotoAndStop(lightIndex + 3);
      } else {
        light.gotoAndStop(lightIndex);
      }
      changeLight();
    }
  });

  // lightSwitch = new Sprite(resources["img/aSimpleSquare.png"].texture);
  const lightSwitchTexture = [
    resources["img/lampoffbutton.png"].texture,
    resources["img/lamponbutton.png"].texture
  ];
  lightSwitch = new AnimatedSprite(lightSwitchTexture);
  lightSwitch.x = 2516;
  lightSwitch.y = 816;
  lightSwitch.interactive = true;
  lightSwitch.cursor = "pointer";
  lightSwitch.on("mousedown", function() {
    if (!busy) {
      lightOn = !lightOn;
      lightSwitch.gotoAndStop((lightSwitch.currentFrame + 1) % 2);
      if (lightOn) {
        light.gotoAndStop(lightIndex + 3);
      } else {
        light.gotoAndStop(lightIndex);
      }
      changeLight();
    }
  });

  const card1texture = [
    resources["img/word11.png"].texture,
    resources["img/word12.png"].texture
  ];
  card1 = new AnimatedSprite(card1texture);
  card1.x = 2236;
  card1.y = 730;

  const card2texture = [
    resources["img/word21.png"].texture,
    resources["img/word22.png"].texture
  ];
  card2 = new AnimatedSprite(card2texture);
  card2.x = 2322;
  card2.y = 736;

  const card3texture = [
    resources["img/word31.png"].texture,
    resources["img/word32.png"].texture
  ];
  card3 = new AnimatedSprite(card3texture);
  card3.x = 2403;
  card3.y = 744;

  const slide1texture = [
    resources["img/slide11.png"].texture,
    resources["img/slide12.png"].texture
  ];
  slide1 = new AnimatedSprite(slide1texture);
  slide1.x = 440;
  slide1.y = 780;
  slide1.interactive = true;
  slide1.cursor = "pointer";
  slide1.on("mousedown", function() {
    if (!busy) {
      slide1drag = true;
      slide1.gotoAndStop(1);
    }
  });

  const slide2texture = [
    resources["img/slide21.png"].texture,
    resources["img/slide22.png"].texture
  ];
  slide2 = new AnimatedSprite(slide2texture);
  slide2.x = 580;
  slide2.y = 786;
  slide2.interactive = true;
  slide2.cursor = "pointer";
  slide2.on("mousedown", function() {
    if (!busy) {
      slide2drag = true;
      slide2.gotoAndStop(1);
    }
  });

  const slide3texture = [
    resources["img/slide31.png"].texture,
    resources["img/slide32.png"].texture
  ];
  slide3 = new AnimatedSprite(slide3texture);
  slide3.x = 520;
  slide3.y = 808;
  slide3.interactive = true;
  slide3.cursor = "pointer";
  slide3.on("mousedown", function() {
    if (!busy) {
      slide3drag = true;
      slide3.gotoAndStop(1);
    }
  });

  magiceye = new Sprite(resources["img/aSimpleSquare.png"].texture);
  magiceye.x = 1792;
  magiceye.y = 960;
  magiceye.interactive = true;
  magiceye.cursor = "pointer";
  magiceye.on("mousedown", function() {
    if (!busy) {
      openGui("me");
    }
  });

  room.addChild(bg);
  room.addChild(td);
  room.addChild(tdkp);
  room.addChild(tdman);
  room.addChild(magicbox);
  room.addChild(witch);
  room.addChild(radio);
  room.addChild(binaryBook);
  room.addChild(bookOfSymbols);
  room.addChild(comicBook);
  room.addChild(box);
  room.addChild(tube1);
  room.addChild(tube2);
  room.addChild(tube3);
  room.addChild(tube4);
  room.addChild(cardPrinter);
  room.addChild(light);
  room.addChild(lightSwitch);
  room.addChild(card1);
  room.addChild(card2);
  room.addChild(card3);
  room.addChild(slide1);
  room.addChild(slide2);
  room.addChild(slide3);
  room.addChild(magiceye);

  room.width = roomWidth;
  room.height = roomHeight;

  // gui = new Sprite(resources["img/aSimpleSquare.png"].texture);
  // gui = new Rectangle(
  //   0.1 * windowWidth,
  //   0.1 * windowHeight,
  //   0.8 * windowWidth,
  //   0.8 * windowHeight
  // );
  gui = new Container();
  gui.x = 0.1 * windowWidth;
  gui.y = 0.1 * windowHeight;
  // gui.width = 0.8 * windowWidth;
  // gui.height = 0.8 * windowHeight;
  // gui.interactive = true;
  gui.visible = false;

  phone = new Sprite(resources["img/aSimpleSquare.png"].texture);
  phone.x = windowWidth - 100 - phone.width;
  phone.y = windowHeight - 40 - phone.height;
  phone.interactive = true;
  phone.cursor = "pointer";
  phone.on("mousedown", function() {
    openPhone();
  });

  phoneGui = new Sprite(resources["img/phoneScreen.png"].texture);
  phoneGui.x = phone.x;
  phoneGui.y = phone.y;
  phoneGui.height = 1;
  phoneGui.width = 1;
  phoneGui.visible = false;
  phoneGui.interactive = true;

  wren = new Sprite(resources["img/wren.png"].texture);
  wren.x = -600;
  wren.y = 0;
  wren.height = windowHeight;
  wren.width = (16 * wren.height) / 9;
  wren.visible = false;

  settingsButton = new Sprite(resources["img/redSquare.png"].texture);
  settingsButton.x = PHONE_SCREEN_WIDTH * 0.5 - settingsButton.width / 2;
  settingsButton.y = PHONE_SCREEN_HEIGHT * 0.3;
  settingsButton.interactive = true;
  settingsButton.cursor = "pointer";
  settingsButton.on("mousedown", function() {});

  chatAppButton = new Sprite(resources["img/redSquare.png"].texture);
  chatAppButton.x = PHONE_SCREEN_WIDTH * 0.5 - chatAppButton.width / 2;
  chatAppButton.y = PHONE_SCREEN_HEIGHT * 0.6;
  chatAppButton.interactive = true;
  chatAppButton.cursor = "pointer";
  chatAppButton.on("mousedown", function() {});

  // phoneGui.addChild(settingsButton);
  // phoneGui.addChild(chatAppButton);

  app.stage.addChild(room);
  app.stage.addChild(phone);
  app.stage.addChild(gui);
  app.stage.addChild(phoneGui);
  // app.stage.addChild(wren);

  app.stage.interactive = true;
  app.stage.on("mouseup", stageMouseUp);

  // now some server calls to set things up
  $.ajax("server/td.php", {
    contentType: "application/json",
    dataType: "json",
    success: function(data, status, xhr) {
      if (data.flag === "true") {
        // whether td can be used
        td.cursor = "pointer";
        td.gotoAndStop(1);
        tdkp.cursor = "default";
        tdkp.off("mousedown");

        // whether td has a realm set
        if (data.realm.length > 0) {
          td.on("mousedown", function() {
            if (!busy) {
              window.open(data.realm);
            }
          });
        }
      }

      // whether a convesation is saved
      currConvoId = data.convoid;
      currMsgIndex = parseInt(data.lastMsgIndex) + 1;
      let convo = resources["json/convos.json"].data[currConvoId];
      if (data.convoid === "") {
        openPhone("begin");
      } else if (data.lastMsgIndex < convo.length - 1) {
        openPhone();
      }
    },
    error: function(xhr, errortype, exception) {
      console.error("REQUEST UTTERLY FAILED!", errortype, exception);
    }
  });

  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  let mousex;
  let mousey;

  if (gui.visible) {
    // must add listener here and not in openGui or else gui closes immediately
    app.stage.on("mousedown", stageMouseDown);
  }
  const smoothSpeed = 0.06;
  let mouseEvent = app.renderer.plugins.interaction.eventData.data;
  if (mouseEvent) {
    mousex = mouseEvent.global.x;
    mousey = mouseEvent.global.y;

    if (!stopPan && mouseEvent.pointerType == "mouse") {
      // let scalex = 2;
      // let scaley = 1.4;

      let offsetx = 100; // amount of pan area to cut off
      let offsety = 100;

      // 1. (attempt1)
      // let desiredroomx = ((windowWidth - roomWidth) / windowWidth) * mousex; // if pan area has 1:1 ratio to window
      // let desiredroomy = ((windowHeight - roomHeight) / windowHeight) * mousey; // if pan area has 1:1 ratio to window

      // 2. (attempt2)
      // let centerx = windowWidth - mousex; // fine if pan area has a 1:1 ratio to window... but...
      // let centery = windowHeight - mousey;

      // 3. (attempt3)
      let centerx =
        ((windowWidth + 2 * offsetx) / -windowWidth) * mousex +
        windowWidth +
        offsetx;
      let centery =
        ((windowHeight + 2 * offsety) / -windowHeight) * mousey +
        windowHeight +
        offsety;

      let desiredroomx = centerx - roomWidth / 2;
      let desiredroomy = centery - roomHeight / 2;

      // cut bounds
      if (desiredroomx < windowWidth - roomWidth) {
        desiredroomx = windowWidth - roomWidth;
      }
      if (desiredroomy < windowHeight - roomHeight) {
        desiredroomy = windowHeight - roomHeight;
      }
      if (desiredroomx > 0) {
        desiredroomx = 0;
      }
      if (desiredroomy > 0) {
        desiredroomy = 0;
      }

      let smoothx = (1 - smoothSpeed) * room.x + smoothSpeed * desiredroomx;
      let smoothy = (1 - smoothSpeed) * room.y + smoothSpeed * desiredroomy;
      room.x = smoothx;
      room.y = smoothy;
    }
  }

  // handle dragged items
  if (slide1drag) {
    slide1.x = ((mousex - room.x) * ROOM_IMG_WIDTH) / roomWidth - slide1.width;
    slide1.y =
      ((mousey - room.y) * ROOM_IMG_HEIGHT) / roomHeight - slide1.height / 2;
  }
  if (slide2drag) {
    slide2.x = ((mousex - room.x) * ROOM_IMG_WIDTH) / roomWidth - slide2.width;
    slide2.y =
      ((mousey - room.y) * ROOM_IMG_HEIGHT) / roomHeight - slide2.height / 2;
  }
  if (slide3drag) {
    slide3.x = ((mousex - room.x) * ROOM_IMG_WIDTH) / roomWidth - slide3.width;
    slide3.y =
      ((mousey - room.y) * ROOM_IMG_HEIGHT) / roomHeight - slide3.height / 2;
  }
  if (carddrag && card) {
    card.x = ((mousex - room.x) * ROOM_IMG_WIDTH) / roomWidth - card.width / 2;
    card.y =
      ((mousey - room.y) * ROOM_IMG_HEIGHT) / roomHeight - card.height / 2;
  }
}

function resize() {
  // get new window size
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  // scale room (bg, etc) to size
  if (windowWidth / windowHeight > 16 / 9) {
    roomWidth = 1.1 * windowWidth;
    roomHeight = (9 * roomWidth) / 16;
  } else {
    roomHeight = 1.1 * windowHeight;
    roomWidth = (16 * roomHeight) / 9;
  }

  room.width = roomWidth;
  room.height = roomHeight;

  app.renderer.resize(windowWidth, windowHeight);

  if (room.x < windowWidth - roomWidth) {
    room.x = windowWidth - roomWidth;
  }
  if (room.y < windowHeight - roomHeight) {
    room.y = windowHeight - roomHeight;
  }
  if (room.x > 0) {
    room.x = 0;
  }
  if (room.y > 0) {
    room.y = 0;
  }

  gui.x = 0.1 * windowWidth;
  gui.y = 0.1 * windowHeight;
  gui.width = 0.9 * windowWidth;
  gui.height = 0.9 * windowHeight;

  phone.x = windowWidth - 100 - phone.width;
  phone.y = windowHeight - 40 - phone.height;

  phoneGui.y = 40;
  phoneGui.height = windowHeight - 2 * phoneGui.y;
  phoneGui.width = (9 * phoneGui.height) / 16;
  phoneGui.x = 0.6 * windowWidth;

  wren.height = windowHeight;
  wren.width = (16 * wren.height) / 9;

  convoHolder.style.left = `${phoneGui.x + 10}px`;
  convoHolder.style.top = `${phoneGui.y + 0.4 * phoneGui.height}px`;
  convoHolder.style.width = `${phoneGui.width - 20}px`;
  convoHolder.style.height = `${0.45 * phoneGui.height}px`;
}

function stageMouseDown(event) {
  // check if outside bounds of gui
  let mousex = event.data.global.x;
  let mousey = event.data.global.y;

  if (
    gui.visible == true &&
    (mousex < gui.x ||
      mousex > gui.x + gui.width ||
      mousey < gui.y ||
      mousey > gui.y + gui.height)
  ) {
    closeGui();
  }
  if (
    phoneGui.visible == true &&
    (mousex < phoneGui.x ||
      mousex > phoneGui.x + phoneGui.width ||
      mousey < phoneGui.y ||
      mousey > phoneGui.y + phoneGui.height)
  ) {
    closePhone();
  }
}

function stageMouseUp() {
  slide1drag = false;
  slide1.x = 440;
  slide1.y = 780;
  slide1.gotoAndStop(0);

  slide2drag = false;
  slide2.x = 580;
  slide2.y = 786;
  slide2.gotoAndStop(0);

  slide3drag = false;
  slide3.x = 520;
  slide3.y = 808;
  slide3.gotoAndStop(0);

  if (carddrag) {
    let withinBounds =
      card.x < td.x + td.width &&
      card.x + card.width > td.x &&
      card.y < td.y + td.height &&
      card.y + card.height > td.y;
    if (withinBounds) {
      carddrag = false;
      $.ajax("server/td.php", {
        contentType: "application/json",
        data: {
          card1: card.chosenCards[0],
          card2: card.chosenCards[1],
          card3: card.chosenCards[2]
        },
        dataType: "json",
        success: function(data, status, xhr) {
          if (data.flag === "true") {
            carddrag = false;
            // play a lil animation
            setTimeout(function() {
              card.visible = false;
              td.off("mousedown");
              td.on("mousedown", function() {
                if (!busy) {
                  // open a webpage related to the card dragged in
                  window.open(data.realm);
                }
              });
            }, 2000);
          } else {
            card.x = 1760;
            card.y = 800;
          }
        },
        error: function(xhr, errortype, exception) {
          console.error("REQUEST UTTERLY FAILED!", errortype, exception);
        }
      });
    } else {
      carddrag = false;
      card.x = 1760;
      card.y = 800;
    }
  }
}

function openGui(type) {
  // Graphics.drawRect(0.1 * windowWidth, 0.1 * windowHeight, 0.8 * windowWidth, 0.8 * windowHeight);

  let textStyle = {
    fontFamily: "Source Sans Pro",
    fontSize: 18,
    wordWrap: true,
    wordWrapWidth: 500
  };
  switch (type) {
    case "tdkp":
      tdInput.style.display = "block";
      break;
    case "tdman":
      // let texttdman = new Text(
      //   resources["json/text.json"].data["tdman"]["gui"],
      //   textStyle
      // );
      let manual = new Sprite(resources["img/tdman.png"].texture);
      manual.width = 0.9 * windowWidth;
      manual.height = 0.9 * windowHeight;
      // text.x = 0.1 * windowWidth;
      // text.y = 0.1 * windowHeight;
      // gui.addChild(texttdman);
      gui.addChild(manual);
      break;
    case "mb":
      mb1Input.style.display = "block";
      mb2Input.style.display = "block";
      mb3Input.style.display = "block";
      mb4Input.style.display = "block";
      break;
    case "bos":
      break;
    case "bb":
      break;
    case "cb":
      break;

    case "witch":
      // let text = new Text(
      //   resources["json/text.json"].data["witch"]["gui"],
      //   textStyle
      // );
      // text.x = 0.1 * windowWidth;
      // text.y = 0.1 * windowHeight;
      // gui.addChild(text);
      let witchGui = new Sprite(resources["img/witch.png"].texture);
      witchGui.width = 0.9 * windowWidth;
      witchGui.height = 0.9 * windowHeight;
      gui.addChild(witchGui);
      break;
    case "me":
      let me = new Sprite(resources["img/magic eye.png"].texture);
      me.width = 0.9 * windowWidth;
      me.height = 0.9 * windowHeight;
      gui.addChild(me);
      break;
    case "cp":
      const cardPrinterTexture = [
        resources["img/cardprinter.png"].texture,
        resources["img/cardprinter1.png"].texture,
        resources["img/cardprinter2.png"].texture,
        resources["img/cardprinter3.png"].texture
      ];
      let cp = new AnimatedSprite(cardPrinterTexture);
      cp.width = windowWidth * 0.9; // TODO
      cp.height = windowHeight * 0.9;

      const buttonTexture = [
        resources["img/cpb.png"].texture,
        resources["img/cpbpressed.png"].texture
      ];
      // add all buttons
      let buttonMargin = 20;
      for (let row = 0; row < 4; row++) {
        let numCols = 3;
        if (row === 1 || row === 2) {
          numCols = 4;
        }
        for (let col = 0; col < numCols; col++) {
          let button = new AnimatedSprite(buttonTexture);
          button.x = cp.x + 890 + col * (button.width + 10);
          if (row === 1 || row === 2) {
            button.x -= 30;
          }
          button.y = cp.y + 320 + row * (button.height + buttonMargin);
          button.interactive = true;
          button.cursor = "pointer";
          button.on("mousedown", function() {
            let cardNum = row * 7 + col;
            if (!chosenCards.includes(cardNum) && chosenCards.length < 3) {
              chosenCards.push(cardNum);
              button.gotoAndStop(1);
              cp.gotoAndStop(cp.currentFrame + 1);
              if (chosenCards.length == 3) {
                setTimeout(function() {
                  cp.gotoAndStop(0);
                  printCard(chosenCards);
                }, 500);
              }
            }
          });
          cp.addChild(button);
        }
      }
      gui.addChild(cp);
  }
  gui.visible = true;
  stopPan = true;
}

function openPhone(convoid) {
  if (!busy && !phoneGui.visible) {
    busy = true;
    phoneGui.visible = true;
    phoneGui.x = phone.x;
    phoneGui.y = phone.y;
    phoneGui.height = 1;
    phoneGui.width = 1;
    phoneGui.alpha = 0;

    let finalX = 0.6 * windowWidth;
    let finalY = 40;
    let finalHeight = windowHeight - 2 * finalY;
    let finalWidth = (9 * finalHeight) / 16;

    createjs.Tween.get(phoneGui)
      .to(
        {
          x: finalX,
          y: finalY,
          width: finalWidth,
          height: finalHeight,
          alpha: 1
        },
        PHONE_SPEED,
        createjs.Ease.quadInOut()
      )
      .call(function() {
        playConversation(convoid);
      });

    wren.visible = true;
    wren.x = -600;

    let finalWrenX = 0;
    createjs.Tween.get(wren).to(
      {
        x: finalWrenX
      },
      PHONE_SPEED,
      createjs.Ease.quadInOut()
    );
    stopPan = true;
  }
}

function closeGui() {
  gui.visible = false;
  gui.removeChildren();
  stopPan = false;
  app.stage.off("mousedown");
  chosenCards = [];

  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].style.display = "none";
  }
}

function closePhone() {
  convoHolder.style.display = "none";
  while (convoHolder.firstChild) {
    convoHolder.removeChild(convoHolder.firstChild);
  }

  let finalX = phone.x;
  let finalY = phone.y;
  let finalHeight = 1;
  let finalWidth = 1;

  createjs.Tween.get(phoneGui)
    .to(
      {
        x: finalX,
        y: finalY,
        width: finalWidth,
        height: finalHeight,
        alpha: 0
      },
      PHONE_SPEED,
      createjs.Ease.quadInOut()
    )
    .call(function() {
      phoneGui.visible = false;
      stopPan = false;
      app.stage.off("mousedown");
      busy = false;
    });

  let finalWrenX = -600;
  createjs.Tween.get(wren)
    .to(
      {
        x: finalWrenX
      },
      PHONE_SPEED,
      createjs.Ease.quadInOut()
    )
    .call(function() {
      wren.visible = false;
    });
}

function validateInput(type, input) {
  busy = true;

  // note: right now, we validate input here. Future: validate on server to obfuscate answer
  switch (type) {
    case "td":
      closeGui();
      $.ajax("server/td.php", {
        data: { input: input },
        contentType: "application/json",
        dataType: "json",
        success: function(data, status, xhr) {
          if (data.flag === "true") {
            setTimeout(function() {
              td.cursor = "pointer";
              td.gotoAndStop(1);
              tdkp.cursor = "default";
              tdkp.off("mousedown");
              busy = false;
            }, 50);
          } else {
            busy = false;
          }
        },
        error: function(xhr, errortype, exception) {
          console.error("REQUEST UTTERLY FAILED!", errortype, exception);
        }
      });
      break;
    case "mb1":
      if (input == "1") {
        console.log(input);
      } else {
      }
      busy = false;
      break;
    case "mb2":
      if (input == "1") {
        console.log(input);
      } else {
      }
      busy = false;
      break;
    case "mb3":
      if (input == "1") {
        console.log(input);
      } else {
      }
      busy = false;
      break;
    case "mb4":
      if (input == "1") {
        console.log(input);
      } else {
      }
      busy = false;
      break;
  }
}

function printCard(chosen) {
  busy = true;
  room.removeChild(card);
  closeGui();
  // play animation
  setTimeout(function() {
    // add a card to scene
    card = new Sprite(resources["img/aSimpleSquare.png"].texture);
    card.chosenCards = chosen;
    chosenCards = [];
    card.x = 1760;
    card.y = 800;
    card.width = 20;
    card.height = 30;
    card.interactive = true;
    card.cursor = "pointer";
    card.on("mousedown", function() {
      if (!busy) {
        carddrag = true;
      }
    });
    room.addChild(card);
    busy = false;
  }, 2000);
}

function changeLight() {
  if (lightOn) {
    if (lightIndex == 0) {
      card1.gotoAndStop(1);
      card2.gotoAndStop(0);
      card3.gotoAndStop(0);
    } else if (lightIndex == 1) {
      card1.gotoAndStop(0);
      card2.gotoAndStop(1);
      card3.gotoAndStop(0);
    } else if (lightIndex == 2) {
      card1.gotoAndStop(0);
      card2.gotoAndStop(0);
      card3.gotoAndStop(1);
    }
  } else {
    card1.gotoAndStop(0);
    card2.gotoAndStop(0);
    card3.gotoAndStop(0);
  }
}

let currMsgIndex;
let currConvoId;

function playConversation(newConvoId) {
  convoHolder.style.left = `${phoneGui.x + 0.02 * phoneGui.width}px`;
  convoHolder.style.top = `${phoneGui.y + 0.4 * phoneGui.height}px`;
  convoHolder.style.width = `${0.9 * phoneGui.width}px`;
  convoHolder.style.height = `${0.45 * phoneGui.height}px`;
  convoHolder.style.display = "flex";

  if (typeof convoHolder.onselectstart != "undefined") {
    convoHolder.onselectstart = function() {
      return false;
    };
  } else if (typeof convoHolder.style.MozUserSelect != "undefined") {
    convoHolder.style.MozUserSelect = "none";
  } else {
    convoHolder.onmousedown = function() {
      return false;
    };
  }

  if (!newConvoId) {
    // make ajax request for info...
    $.ajax("server/td.php", {
      contentType: "application/json",
      dataType: "json",
      success: function(data, status, xhr) {
        currMsgIndex = parseInt(data.lastMsgIndex) + 1;
        addLastMessages(data.convoid, data.lastMsgIndex);
        currConvoId = data.convoid;
        let convo = resources["json/convos.json"].data[currConvoId];
        if (currMsgIndex < convo.length) {
          app.stage.on("mousedown", addNextMessage);
          convoHolder.addEventListener("click", addNextMessage);
        } else {
          app.stage.on("mousedown", stageMouseDown);
        }
      },
      error: function(xhr, errortype, exception) {
        console.error("REQUEST UTTERLY FAILED!", errortype, exception);
      }
    });
  } else {
    // we're starting a new convo.
    currConvoId = newConvoId;
    currMsgIndex = 0;
    app.stage.on("mousedown", addNextMessage);
    convoHolder.addEventListener("click", addNextMessage);
    addNextMessage();
  }
}

function addNextMessage() {
  let convo = resources["json/convos.json"].data[currConvoId];
  let msg = convo[currMsgIndex];
  addMessageUi(msg);
  convoHolder.scrollTo(0, convoHolder.scrollHeight);

  $.ajax("server/td.php", {
    contentType: "application/json",
    data: { convoid: currConvoId, lastMsgIndex: currMsgIndex },
    dataType: "json",
    success: function(data, status, xhr) {},
    error: function(xhr, errortype, exception) {
      console.error("REQUEST UTTERLY FAILED!", errortype, exception);
    }
  });

  currMsgIndex++;

  if (currMsgIndex >= convo.length) {
    app.stage.off("mousedown");
    app.stage.on("mousedown", stageMouseDown);
    convoHolder.removeEventListener("click", addNextMessage);
    return;
  }
}

// note: this function should not make server calls or modify any data!
function addLastMessages(convoid, lastMsgIndex) {
  let convo = resources["json/convos.json"].data[convoid];
  if (!convo) {
    return;
  }

  let index = 0;
  while (index <= lastMsgIndex && index < convo.length) {
    let msg = convo[index];
    addMessageUi(msg);
    index++;
  }
  convoHolder.scrollTo(0, convoHolder.scrollHeight);
}

// msg is an object with char and text fields
function addMessageUi(msg) {
  let char = msg["char"];
  let msgText = msg["text"];

  // create message bubble
  let msgContainer = document.createElement("div"); // wrapper
  msgContainer.classList.add("msg-container");
  msgContainer.style.width = "100%";
  msgContainer.style.display = "flex";
  let msgIcon = document.createElement("img");
  msgIcon.style.borderRadius = "50%";
  msgIcon.style.width = "30px";
  msgIcon.style.height = "30px";

  let msgBubble = document.createElement("div");
  msgBubble.classList.add("msg-bubble");
  msgBubble.style.padding = "5px";
  msgBubble.style.borderRadius = "5px";
  msgBubble.style.margin = "5px";
  msgBubble.style.maxWidth = `${0.5 * phoneGui.width}px`;
  msgBubble.innerText = msgText;
  if (char === "xxx") {
    msgContainer.style.justifyContent = "flex-start";
    msgBubble.style.background = "#f1f0f0";
    msgIcon.src = "img/redSquare.png";
    msgContainer.appendChild(msgIcon);
    msgContainer.appendChild(msgBubble);
  } else if (char === "wren") {
    msgContainer.style.justifyContent = "flex-end";
    msgBubble.style.background = "#dbdfff";
    msgIcon.src = "img/aSimpleSquare.png";
    msgContainer.appendChild(msgBubble);
    msgContainer.appendChild(msgIcon);
  }
  convoHolder.appendChild(msgContainer);
}
