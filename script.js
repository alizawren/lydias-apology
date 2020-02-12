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

////////////////////////////

// Constants
const ROOM_IMG_WIDTH = 2560;
const ROOM_IMG_HEIGHT = 1440;

const PHONE_SCREEN_WIDTH = 1080;
const PHONE_SCREEN_HEIGHT = 1920;

////////////////////////////

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

// get rid of audio context warnings
PIXI.utils.sayHello(
  "Welcome friend! Not everything is as it seems. You are rendering: " + type
);
console.log(
  "Forgive the above warnings; preloading sounds triggers the creation of AudioContexts, but it helps load sounds faster! Signed, ↑"
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
  .add("img/cardprinter.png")
  .add("img/stereogram.jpg")
  // text
  .add("json/text.json")
  // sound
  .add("sound/streets.mp3")
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
let gui, phone, phoneGui, settingsButton;
let bgm;
let slide1drag = false;
let slide2drag = false;
let slide3drag = false;
let carddrag = false;
let lightOn = false;
let lightIndex = 0;
let transmute = false; // TODO: in the future, use a boolean on the server to avoid console variable manipulation
let busy = false;
let stopPan = false;

//This `setup` function will run when the image has loaded
function setup() {
  document.body.removeChild(loadBox);
  document.body.removeChild(loadBar);
  document.body.removeChild(loadingText);
  document.body.removeChild(littleBear);

  bgm = resources["sound/streets.mp3"].sound;
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

  td = new Sprite(resources["img/aSimpleSquare.png"].texture);
  td.x = 1312;
  td.y = 416;
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

  tdman = new Sprite(resources["img/aSimpleSquare.png"].texture);
  tdman.x = 1344;
  tdman.y = 720;
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

  witch = new Sprite(resources["img/aSimpleSquare.png"].texture);
  witch.x = 992;
  witch.y = 720;
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

  bookOfSymbols = new Sprite(resources["img/aSimpleSquare.png"].texture);
  bookOfSymbols.x = 896;
  bookOfSymbols.y = 384;
  bookOfSymbols.interactive = true;
  bookOfSymbols.cursor = "pointer";
  bookOfSymbols.on("mousedown", function() {
    if (!busy) {
      openGui("bos");
    }
  });

  binaryBook = new Sprite(resources["img/aSimpleSquare.png"].texture);
  binaryBook.x = 832;
  binaryBook.y = 384;
  binaryBook.interactive = true;
  binaryBook.cursor = "pointer";
  binaryBook.on("mousedown", function() {
    if (!busy) {
      openGui("bb");
    }
  });

  comicBook = new Sprite(resources["img/aSimpleSquare.png"].texture);
  comicBook.x = 768;
  comicBook.y = 384;
  comicBook.interactive = true;
  comicBook.cursor = "pointer";
  comicBook.on("mousedown", function() {
    if (!busy) {
      openGui("cb");
    }
  });
  let tube1texture = [
    resources["img/aSimpleSquare.png"].texture,
    resources["img/redSquare.png"].texture
  ];
  box = new AnimatedSprite(tube1texture);
  box.x = 1360;
  box.y = 960;
  box.interactive = true;
  box.cursor = "pointer";
  box.on("mousedown", function() {
    if (!busy) {
      box.gotoAndStop((box.currentFrame + 1) % box.totalFrames);
    }
  });

  // tube1 = new Sprite(resources["img/aSimpleSquare.png"].texture);

  tube1 = new AnimatedSprite(tube1texture);
  tube1.x = 208;
  tube1.y = 704;
  tube1.interactive = true;
  tube1.cursor = "pointer";
  tube1.on("mousedown", function() {
    if (!busy) {
      tube1.gotoAndStop((tube1.currentFrame + 1) % tube1.totalFrames);
    }
  });

  tube2 = new AnimatedSprite(tube1texture);
  tube2.x = 256;
  tube2.y = 704;
  tube2.interactive = true;
  tube2.cursor = "pointer";
  tube2.on("mousedown", function() {
    if (!busy) {
      tube2.gotoAndStop((tube2.currentFrame + 1) % tube2.totalFrames);
    }
  });

  tube3 = new AnimatedSprite(tube1texture);
  tube3.x = 304;
  tube3.y = 704;
  tube3.interactive = true;
  tube3.cursor = "pointer";
  tube3.on("mousedown", function() {
    if (!busy) {
      tube3.gotoAndStop((tube3.currentFrame + 1) % tube3.totalFrames);
    }
  });

  tube4 = new AnimatedSprite(tube1texture);
  tube4.x = 352;
  tube4.y = 704;
  tube4.interactive = true;
  tube4.cursor = "pointer";
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

  let lighttexture = [
    resources["img/aSimpleSquare.png"].texture,
    resources["img/redSquare.png"].texture,
    resources["img/greenSquare.png"].texture
  ];
  // light = new Sprite(resources["img/aSimpleSquare.png"].texture);
  light = new AnimatedSprite(lighttexture);
  light.x = 2480;
  light.y = 650;
  light.interactive = true;
  light.cursor = "pointer";
  light.on("mousedown", function() {
    if (!busy) {
      lightIndex = (lightIndex + 1) % 3;
      light.gotoAndStop(lightIndex);
      changeLight();
    }
  });

  // lightSwitch = new Sprite(resources["img/aSimpleSquare.png"].texture);
  lightSwitch = new AnimatedSprite(tube1texture);
  lightSwitch.x = 2480;
  lightSwitch.y = 720;
  lightSwitch.interactive = true;
  lightSwitch.cursor = "pointer";
  lightSwitch.on("mousedown", function() {
    if (!busy) {
      lightOn = !lightOn;
      lightSwitch.gotoAndStop((lightSwitch.currentFrame + 1) % 2);
      changeLight();
    }
  });

  // card1 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  card1 = new AnimatedSprite(tube1texture);
  card1.x = 2240;
  card1.y = 768;

  // card2 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  card2 = new AnimatedSprite(tube1texture);
  card2.x = 2320;
  card2.y = 768;

  // card3 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  card3 = new AnimatedSprite(tube1texture);
  card3.x = 2400;
  card3.y = 768;

  slide1 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  slide1.x = 496;
  slide1.y = 736;
  slide1.interactive = true;
  slide1.cursor = "pointer";
  slide1.on("mousedown", function() {
    if (!busy) {
      slide1drag = true;
      //slide1 frame = next frame
    }
  });

  slide2 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  slide2.x = 608;
  slide2.y = 752;
  slide2.interactive = true;
  slide2.cursor = "pointer";
  slide2.on("mousedown", function() {
    if (!busy) {
      slide2drag = true;
    }
  });

  slide3 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  slide3.x = 560;
  slide3.y = 784;
  slide3.interactive = true;
  slide3.cursor = "pointer";
  slide3.on("mousedown", function() {
    if (!busy) {
      slide3drag = true;
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
  room.addChild(bookOfSymbols);
  room.addChild(binaryBook);
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
  phone.y = windowHeight - 20 - phone.height;
  phone.interactive = true;
  phone.cursor = "pointer";
  phone.on("mousedown", function() {
    if (!busy) {
      phoneGui.visible = true;
      stopPan = true;
    }
  });

  phoneGui = new Sprite(resources["img/phoneScreen.png"].texture);
  phoneGui.y = 30;
  phoneGui.height = windowHeight - 2 * phoneGui.y;
  phoneGui.width = (9 * phoneGui.height) / 16;
  phoneGui.x = windowWidth * 0.5 - phoneGui.width / 2;
  phoneGui.visible = false;
  phoneGui.interactive = true;

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

  phoneGui.addChild(settingsButton);
  phoneGui.addChild(chatAppButton);

  app.stage.addChild(room);
  app.stage.addChild(phone);
  app.stage.addChild(gui);
  app.stage.addChild(phoneGui);

  app.stage.interactive = true;
  app.stage.on("mouseup", stageMouseUp);

  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  let mousex;
  let mousey;

  if (gui.visible || phoneGui.visible) {
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

      let offsetx = 200; // amount of pan area to cut off
      let offsety = 200;

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
    slide1.x =
      ((mousex - room.x) * ROOM_IMG_WIDTH) / roomWidth - slide1.width / 2;
    slide1.y =
      ((mousey - room.y) * ROOM_IMG_HEIGHT) / roomHeight - slide1.height / 2;
  }
  if (slide2drag) {
    slide2.x =
      ((mousex - room.x) * ROOM_IMG_WIDTH) / roomWidth - slide2.width / 2;
    slide2.y =
      ((mousey - room.y) * ROOM_IMG_HEIGHT) / roomHeight - slide2.height / 2;
  }
  if (slide3drag) {
    slide3.x =
      ((mousex - room.x) * ROOM_IMG_WIDTH) / roomWidth - slide3.width / 2;
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
  gui.width = 0.8 * windowWidth;
  gui.height = 0.8 * windowHeight;

  phone.x = windowWidth - 100;
  phone.y = windowHeight - 100;

  phoneGui.y = 30;
  phoneGui.height = windowHeight - 2 * phoneGui.y;
  phoneGui.width = (9 * phoneGui.height) / 16;
  phoneGui.x = windowWidth * 0.5 - phoneGui.width / 2;
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
    phoneGui.visible = false;
    stopPan = false;
    app.stage.off("mousedown");
  }
}

function stageMouseUp() {
  slide1drag = false;
  slide1.x = 496;
  slide1.y = 736;
  //slide1 frame = default

  slide2drag = false;
  slide2.x = 608;
  slide2.y = 752;

  slide3drag = false;
  slide3.x = 560;
  slide3.y = 784;

  if (carddrag) {
    // in the future, make a server call to see if this action is permitted to avoid variable tampering in the console!
    // TODO: BOUNDS CHECK!! very importnat lol
    if (transmute) {
      carddrag = false;
      // play a lil animation
      setTimeout(function() {
        // open a webpage related to the card dragged in
        // window.location.href = "http://alizawren.com";
        card.visible = false;
        td.on("mousedown", function() {
          if (!busy) {
            window.open("http://alizawren.com");
          }
        });
      }, 2000);
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
      let texttdman = new Text(
        resources["json/text.json"].data["tdman"]["gui"],
        textStyle
      );
      // text.x = 0.1 * windowWidth;
      // text.y = 0.1 * windowHeight;
      gui.addChild(texttdman);
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
      let text = new Text(
        resources["json/text.json"].data["witch"]["gui"],
        textStyle
      );
      // text.x = 0.1 * windowWidth;
      // text.y = 0.1 * windowHeight;
      gui.addChild(text);
      break;
    case "me":
      let me = new Sprite(resources["img/stereogram.jpg"].texture);
      me.width = 0.8 * windowWidth;
      me.height = 0.8 * windowHeight;
      gui.addChild(me);
      break;
    case "cp":
      let cp = new Sprite(resources["img/cardprinter.png"].texture);
      cp.width = windowWidth * 0.8; // TODO
      cp.height = windowHeight * 0.8;

      // add all buttons
      let buttonMargin = 20;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 12; col++) {
          let button = new Sprite(resources["img/aSimpleSquare.png"].texture);
          button.width = 100;
          button.height = 100;
          button.x = cp.x + 70 + col * (button.width + 50);
          button.y = cp.y + 250 + row * (button.height + buttonMargin);
          button.interactive = true;
          button.cursor = "pointer";
          button.on("mousedown", function() {
            printCard(row, col);
          });
          cp.addChild(button);
        }
      }

      gui.addChild(cp);
  }
  gui.visible = true;
  stopPan = true;
}

function closeGui() {
  gui.visible = false;
  gui.removeChildren();
  stopPan = false;
  app.stage.off("mousedown");

  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].style.display = "none";
  }
}

function validateInput(type, input) {
  busy = true;

  // note: right now, we validate input here. Future: validate on server to obfuscate answer
  switch (type) {
    case "td":
      closeGui();
      if (input == "code") {
        // "code" is currently the secret code!
        console.log("you got it!");

        // play a lil animation
        setTimeout(function() {
          transmute = true;
          td.cursor = "pointer"; // allow access to transmuter
          busy = false;
        });
      } else {
        console.log("wrong answer");
        busy = false;
      }
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

function printCard(row, col) {
  console.log("printing");
  busy = true;
  room.removeChild(card);
  closeGui();
  // play animation
  setTimeout(function() {
    // add a card to scene
    card = new Sprite(resources["img/aSimpleSquare.png"].texture);
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
