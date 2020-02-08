// native HTML/JS elements

let tdInput = document.createElement("input");
tdInput.setAttribute("type", "text");
tdInput.style.position = "absolute";
tdInput.style.zIndex = 100;
tdInput.style.display = "none";
tdInput.style.top = "400px";
tdInput.style.left = "500px";
tdInput.addEventListener("keypress", function (event) {
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
mb1Input.addEventListener("keypress", function (event) {
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
mb2Input.addEventListener("keypress", function (event) {
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
mb3Input.addEventListener("keypress", function (event) {
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
mb4Input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    validateInput("mb4", mb4Input.value);
  }
});
document.body.appendChild(mb4Input);

////////////////////////////

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello("Welcome friend. Let's solve this mystery together! App Type: " + type);

//Aliases
let Application = PIXI.Application,
  loader = PIXI.Loader.shared,
  resources = PIXI.Loader.shared.resources,
  Sprite = PIXI.Sprite,
  AnimatedSprite = PIXI.AnimatedSprite,
  Container = PIXI.Container;

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
loader.add("img/room.png").add("img/aSimpleSquare.png").add("img/redSquare.png").on("progress", loadProgressHandler).load(setup);

function resize() {
  let canvasX = window.innerWidth;
  let canvasY = window.innerHeight;

  app.renderer.autoDensity = true;
  app.renderer.resize(canvasX, canvasY);

  gui.x = 0.1 * canvasX;
  gui.y = 0.1 * canvasY;
  gui.width = 0.8 * canvasX;
  gui.height = 0.8 * canvasY;

  phone.x = canvasX - 100;
  phone.y = canvasY - 100;
}

function loadProgressHandler(loader, resource) {
  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%");
}

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
  gui;
let slide1drag = false;
let slide2drag = false;
let slide3drag = false;
let busy = false;
let stopPan = false;

//This `setup` function will run when the image has loaded
function setup() {
  let canvasX = window.innerWidth;
  let canvasY = window.innerHeight;

  room = new Container();
  room.x = 0;
  room.y = 0;

  bg = new Sprite(resources["img/room.png"].texture);

  td = new Sprite(resources["img/aSimpleSquare.png"].texture);
  td.x = 820;
  td.y = 260;
  td.interactive = true;
  td.cursor = "pointer";

  tdkp = new Sprite(resources["img/aSimpleSquare.png"].texture);
  tdkp.x = 820;
  tdkp.y = 350;
  tdkp.interactive = true;
  tdkp.cursor = "pointer";
  tdkp.on("pointerdown", function () {
    if (!busy) {
      openGui("tdkp");
    }
  });

  tdman = new Sprite(resources["img/aSimpleSquare.png"].texture);
  tdman.x = 840;
  tdman.y = 450;
  tdman.interactive = true;
  tdman.cursor = "pointer";
  tdman.on("pointerdown", function () {
    if (!busy) {
      openGui("tdman");
    }
  });

  magicbox = new Sprite(resources["img/aSimpleSquare.png"].texture);
  magicbox.x = 100;
  magicbox.y = 200;
  magicbox.interactive = true;
  magicbox.cursor = "pointer";
  magicbox.on("pointerdown", function () {
    if (!busy) {
      openGui("mb");
    }
  });

  witch = new Sprite(resources["img/aSimpleSquare.png"].texture);
  witch.x = 620;
  witch.y = 450;
  witch.interactive = true;
  witch.cursor = "pointer";
  witch.on("pointerdown", function () {
    if (!busy) {
      openGui("witch");
    }
  });

  radio = new Sprite(resources["img/aSimpleSquare.png"].texture);
  radio.x = 470;
  radio.y = 450;
  radio.interactive = true;
  radio.cursor = "pointer";

  bookOfSymbols = new Sprite(resources["img/aSimpleSquare.png"].texture);
  bookOfSymbols.x = 560;
  bookOfSymbols.y = 240;
  bookOfSymbols.interactive = true;
  bookOfSymbols.cursor = "pointer";
  bookOfSymbols.on("pointerdown", function () {
    if (!busy) {
      openGui("bos");
    }
  });

  binaryBook = new Sprite(resources["img/aSimpleSquare.png"].texture);
  binaryBook.x = 520;
  binaryBook.y = 240;
  binaryBook.interactive = true;
  binaryBook.cursor = "pointer";
  binaryBook.on("pointerdown", function () {
    if (!busy) {
      openGui("bb");
    }
  });

  comicBook = new Sprite(resources["img/aSimpleSquare.png"].texture);
  comicBook.x = 480;
  comicBook.y = 240;
  comicBook.interactive = true;
  comicBook.cursor = "pointer";
  comicBook.on("pointerdown", function () {
    if (!busy) {
      openGui("cb");
    }
  });
  let tube1texture = [
    resources["img/aSimpleSquare.png"].texture,
    resources["img/redSquare.png"].texture
  ];
  box = new AnimatedSprite(tube1texture);
  box.x = 850;
  box.y = 600;
  box.interactive = true;
  box.cursor = "pointer";
  box.on("pointerdown", function () {box.gotoAndStop((box.currentFrame + 1) % box.totalFrames);});

  // tube1 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  
  tube1 = new AnimatedSprite(tube1texture);
  tube1.x = 130;
  tube1.y = 440;
  tube1.interactive = true;
  tube1.cursor = "pointer";
  tube1.on("pointerdown", function () {
    tube1.gotoAndStop((tube1.currentFrame + 1) % tube1.totalFrames);
  });

  tube2 = new AnimatedSprite(tube1texture);
  tube2.x = 160;
  tube2.y = 440;
  tube2.interactive = true;
  tube2.cursor = "pointer";
  tube2.on("pointerdown", function () {tube2.gotoAndStop((tube2.currentFrame + 1) % tube2.totalFrames);});

  tube3 = new AnimatedSprite(tube1texture);
  tube3.x = 190;
  tube3.y = 440;
  tube3.interactive = true;
  tube3.cursor = "pointer";
  tube3.on("pointerdown", function () {tube3.gotoAndStop((tube3.currentFrame + 1) % tube3.totalFrames);});

  tube4 = new AnimatedSprite(tube1texture);
  tube4.x = 220;
  tube4.y = 440;
  tube4.interactive = true;
  tube4.cursor = "pointer";
  tube4.on("pointerdown", function () {tube4.gotoAndStop((tube4.currentFrame + 1) % tube4.totalFrames);});

  cardPrinter = new Sprite(resources["img/aSimpleSquare.png"].texture);
  cardPrinter.x = 1100;
  cardPrinter.y = 450;
  cardPrinter.interactive = true;
  cardPrinter.cursor = "pointer";
  cardPrinter.on("pointerdown", function () {
    if (!busy) {
      openGui("cp");
    }
  });

  light = new Sprite(resources["img/aSimpleSquare.png"].texture);
  light.x = 1550;
  light.y = 450;
  light.interactive = true;
  light.cursor = "pointer";
  light.on("pointerdown", function () {});

  card1 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  card1.x = 1400;
  card1.y = 480;

  card2 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  card2.x = 1450;
  card2.y = 480;

  card3 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  card3.x = 1500;
  card3.y = 480;

  slide1 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  slide1.x = 310;
  slide1.y = 460;
  slide1.interactive = true;
  slide1.cursor = "pointer";
  slide1.on("pointerdown", function() {slide1drag = true;})

  slide2 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  slide2.x = 380;
  slide2.y = 470;
  slide2.interactive = true;
  slide2.cursor = "pointer";
  slide2.on("pointerdown", function() {slide2drag = true;})

  slide3 = new Sprite(resources["img/aSimpleSquare.png"].texture);
  slide3.x = 350;
  slide3.y = 490;
  slide3.interactive = true;
  slide3.cursor = "pointer";
  slide3.on("pointerdown", function() {slide3drag = true;})

  magiceye = new Sprite(resources["img/aSimpleSquare.png"].texture);
  magiceye.x = 1120;
  magiceye.y = 600;
  magiceye.interactive = true;
  magiceye.cursor = "pointer";
  magiceye.on("pointerdown", function () {
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
  room.addChild(card1);
  room.addChild(card2);
  room.addChild(card3);
  room.addChild(slide1);
  room.addChild(slide2);
  room.addChild(slide3);
  room.addChild(magiceye);

  gui = new Sprite(resources["img/aSimpleSquare.png"].texture);
  gui.x = 0.1 * canvasX;
  gui.y = 0.1 * canvasY;
  gui.width = 0.8 * canvasX;
  gui.height = 0.8 * canvasY;
  gui.interactive = true;
  gui.visible = false;

  phone = new Sprite(resources["img/aSimpleSquare.png"].texture);
  phone.x = canvasX - 100;
  phone.y = canvasY - 100;
  phone.interactive = true;
  phone.cursor = "pointer";
  phone.on("pointerdown", function (event) {
    if (!busy) {
      phoneGui.visible = true;
      stopPan = true;
    }
  });

  phoneGui = new Sprite(resources["img/aSimpleSquare.png"].texture);
  phoneGui.x = 400;
  phoneGui.y = 30;
  phoneGui.width = 400;
  phoneGui.height = 600;
  phoneGui.visible = false;
  phoneGui.interactive = true;

  app.stage.addChild(room);
  app.stage.addChild(phone);
  app.stage.addChild(gui);
  app.stage.addChild(phoneGui);

  app.stage.interactive = true;
  app.stage.on("pointerup", stagePointerUp)

  app.ticker.add(delta => gameLoop(delta));
}

const smoothSpeed = 0.08;

function gameLoop(delta) {
  let canvasX = window.innerWidth;
  let canvasY = window.innerHeight;

  if (gui.visible || phoneGui.visible) {
    app.stage.on("pointerdown", stagePointerDown);
  }
  
    let mouseEvent = app.renderer.plugins.interaction.eventData.data;
    let mousex;
    let mousey;
    if (mouseEvent) {
      mousex = mouseEvent.global.x;
      mousey = mouseEvent.global.y;
    }
    let desiredx = 0;
    let desiredy = 0;

    if (mouseEvent) {
      desiredx = canvasX / 2 - mousex;
      desiredy = canvasY / 2 - mousey;

      if (desiredx > 0) {
        desiredx = 0;
      }
      if (desiredy > 0) {
        desiredy = 0;
      }
      if (desiredx < canvasX - 1600) {
        desiredx = canvasX - 1600;
      }
      if (desiredy < canvasY - 900) {
        desiredy = canvasY - 900;
      }
    }

    let smoothx = (1 - smoothSpeed) * room.x + smoothSpeed * desiredx;
    let smoothy = (1 - smoothSpeed) * room.y + smoothSpeed * desiredy;
    if (!stopPan) {
    room.x = smoothx;
    room.y = smoothy;
  }

  if (slide1drag) {
    slide1.x = mousex - room.x - slide1.width / 2; 
    slide1.y = mousey - room.y - slide1.height / 2;
  }
  if (slide2drag) {
    slide2.x = mousex - room.x - slide2.width / 2; 
    slide2.y = mousey - room.y - slide2.height / 2;
  }
  if (slide3drag) {
    slide3.x = mousex - room.x - slide3.width / 2; 
    slide3.y = mousey - room.y - slide3.height / 2;
  }
}

function stagePointerDown(event) {
  // check if outside bounds of gui
  let mousex = event.data.global.x;
  let mousey = event.data.global.y;

  if (gui.visible == true && (mousex < gui.x || mousex > gui.x + gui.width || mousey < gui.y || mousey > gui.y + gui.height)) {
    closeGui();
  }
  if (phoneGui.visible == true && (mousex < phoneGui.x || mousex > phoneGui.x + phoneGui.width || mousey < phoneGui.y || mousey > phoneGui.y + phoneGui.height)) {
    phoneGui.visible = false;
    stopPan = false;
  }
}

function stagePointerUp() {
  slide1drag = false; 
  slide1.x = 310; 
  slide1.y = 460;

  slide2drag = false; 
  slide2.x = 380;
  slide2.y = 470;

  slide3drag = false; 
  slide3.x = 350;
  slide3.y = 490;
}

function openGui(type) {
  switch (type) {
    case "tdkp":
      tdInput.style.display = "block";
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
  }
  gui.visible = true;
  stopPan = true;
  app.stage.off("pointerdown");
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
      } else {
        console.log("wrong answer");
      }
      break;
    case "mb1":
      if (input == "1") {
        console.log(input);
      } else {}
      break;
    case "mb2":
      if (input == "1") {
        console.log(input);
      } else {}
      break;
    case "mb3":
      if (input == "1") {
        console.log(input);
      } else {}
      break;
    case "mb4":
      if (input == "1") {
        console.log(input);
      } else {}
      break;
  }
  // play a lil animation

  busy = false;
}

function closeGui() {
  gui.visible = false;
  stopPan = false;
  app.stage.off("pointerdown");

  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].style.display = "none";
  }
}