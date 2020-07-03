// loading DOM elts

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

// game DOM elts
let blackScreen = document.createElement("div"); // must be a dom element to be above other dom elements
blackScreen.style.background = "#000";
blackScreen.style.position = "absolute";
blackScreen.style.top = "0px";
blackScreen.style.left = "0px";
blackScreen.style.width = "100vw";
blackScreen.style.height = "100vh";
blackScreen.style.zIndex = 1000;
blackScreen.style.display = "none";
document.body.appendChild(blackScreen);

let dialogue = document.createElement("div");
dialogue.classList.add("dialogue");
dialogue.style.position = "absolute";
dialogue.style.zIndex = 100;
dialogue.style.overflowY = "auto";
dialogue.style.display = "none";
document.body.appendChild(dialogue);

// Constants
const BG_IMG_WIDTH = 2560;
const BG_IMG_HEIGHT = 1440;

const WREN_IMG_WIDTH = 486;
const WREN_IMG_HEIGHT = 1061;

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

// get rid of audio context warnings
PIXI.utils.sayHello("You are rendering: " + type);

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
  resolution: window.devicePixelRatio,
  interactive: true
});
//TODO: add a change resolution option

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
  .add("img/aSimpleSquare.png")
  .add("img/titlescreen.png")
  .add("img/title.png")
  .add("img/playbutton.png")
  .add("img/bedroom.png")
  .add("img/tutoringMaterials.png")
  .add("img/resumes.png")
  .add("img/poster.png")
  .add("img/computer.png")
  .add("img/bedroomarrow.png")
  // .add("img/wren.png")
  .add("img/wren sprite.png")
  .add("img/leftBox.png")
  .add("img/middleBox.png")
  .add("img/rightBox.png")
  // text
  //   .add("json/text.json")
  //   .add("json/convos.json")
  // sound
  .add("sound/wren.wav")
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

let bgWidth = BG_IMG_WIDTH;
let bgHeight = BG_IMG_HEIGHT;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// GLOBAL VARIABLES
let titleScreen,
  titleScreenBg,
  title,
  playbutton,
  // blackScreen,
  bg,
  wren,
  textBox,
  instructions,
  tutorMaterials,
  resume,
  poster,
  computer,
  arrow;
let busy = false;
let fadeIn = false;
let fadeOut = false;
let startedRoom = false;
let stopPan = false;

//This `setup` function will run when resources have loaded
function setup() {
  document.body.removeChild(loadBox);
  document.body.removeChild(loadBar);
  document.body.removeChild(loadingText);
  document.body.removeChild(littleBear);

  ///// title screen

  titleScreenBg = new Sprite(resources["img/titlescreen.png"].texture);

  titleScreen = new Container();

  title = new Sprite(resources["img/title.png"].texture);

  playButton = new Sprite(resources["img/playbutton.png"].texture);
  playButton.x = title.width / 2 - playButton.width / 2;
  playButton.y = title.height + 40;
  playButton.interactive = true;
  playButton.cursor = "pointer";
  playButton.on("pointerdown", playGame);

  titleScreen.addChild(title);
  titleScreen.addChild(playButton);

  titleScreen.x = windowWidth / 2;
  titleScreen.y = windowHeight / 2;

  titleScreen.pivot.x = titleScreen.width / 2;
  titleScreen.pivot.y = titleScreen.height / 2;

  ////// game

  bgm = resources["sound/wren.wav"].sound;
  bgm.loop = true;

  bg = new Container();

  bgImg = new Sprite(resources["img/bedroom.png"].texture);

  tutorMaterials = new Sprite(resources["img/tutoringMaterials.png"].texture);
  tutorMaterials.x = 28;
  tutorMaterials.y = 600;

  resume = new Sprite(resources["img/resumes.png"].texture);
  resume.x = 1700;
  resume.y = 500;

  poster = new Sprite(resources["img/poster.png"].texture);
  poster.x = 820;

  computer = new Sprite(resources["img/computer.png"].texture);
  computer.x = 1210;
  computer.y = 345;

  arrow = new Sprite(resources["img/bedroomarrow.png"].texture);
  arrow.x = 1070;
  arrow.y = 1230;

  bg.addChild(bgImg);
  bg.addChild(tutorMaterials);
  bg.addChild(resume);
  bg.addChild(poster);
  bg.addChild(computer);
  bg.addChild(arrow);
  bg.interactive = false;

  instructions = new Text("", {
    fontFamily: "Raleway",
    fontSize: 30,
    fill: 0x000,
    align: "center"
  });
  instructions.alpha = 0;

  soundbutton = new Sprite(resources["img/aSimpleSquare.png"].texture);
  soundbutton.x = windowWidth - 60;
  soundbutton.y = 10;
  soundbutton.cursor = "pointer";
  soundbutton.on("pointerdown", function() {
    if (bgm.isPlaying) {
      bgm.stop();
    } else {
      bgm.play();
    }
  });

  wren = new Sprite(resources["img/wren sprite.png"].texture);

  textBox = new Container();

  leftBox = new Sprite(resources["img/leftBox.png"].texture);
  rightBox = new Sprite(resources["img/rightBox.png"].texture);
  middleBox = new Sprite(resources["img/middleBox.png"].texture);

  textBox.addChild(leftBox);
  textBox.addChild(middleBox);
  textBox.addChild(rightBox);

  ////// add to stage

  app.stage.addChild(titleScreenBg);
  app.stage.addChild(titleScreen);
  app.stage.sortableChildren = true;

  app.stage.interactive = true;
  app.stage.on("pointerdown", stagePointerDown);

  app.ticker.add(delta => gameLoop(delta));

  resize();
}

function playGame() {
  if (busy) {
    return;
  }
  busy = true;

  blackScreen.style.display = "block";
  blackScreen.style.opacity = 0;

  fadeIn = true;
  setInterval(function() {
    if (fadeIn) {
      if (blackScreen.style.opacity < 1) {
        blackScreen.style.opacity = parseFloat(blackScreen.style.opacity) + 0.1;
      } else {
        fadeIn = false;
        // remove game objects
        app.stage.removeChild(titleScreenBg);
        app.stage.removeChild(titleScreen);
        // add all the game objects
        app.stage.addChild(bg);
        app.stage.addChild(wren);
        app.stage.addChild(textBox);
        app.stage.addChild(soundbutton);
        app.stage.addChild(instructions);

        // fetch the dialogue from the server
        $.ajax("server/dialogue.php", {
          dataType: "json",
          success: function(data, status, xhr) {
            if (data.text.length > 0) {
              dialogue.style.display = "block";
              dialogue.onclick = advanceDialogue;
              dialogue.innerHTML = data.text;
            } else {
              dialogue.style.display = "none";
              wren.x = -wren.width;
              wren.visible = false;
              textBox.y = windowHeight;
              textBox.visible = false;
              startRoom2();
            }
          },
          error: function(xhr, errortype, exception) {
            // console.error("REQUEST UTTERLY FAILED!", errortype, exception);
            alert(
              "There was a server error. Try again later. ",
              errortype,
              exception
            );
          }
        });

        wren.zIndex = 1;
        textBox.zIndex = 2;
        instructions.zIndex = 3;
        resize();
        // play music
        setTimeout(function() {
          bgm.play();
          fadeOut = true;
          setInterval(function() {
            if (fadeOut) {
              if (blackScreen.style.opacity > 0) {
                blackScreen.style.opacity -= 0.1;
              } else {
                fadeOut = false;
                blackScreen.style.display = "none";
              }
            }
          }, 40);
        }, 500);
      }
    }
  }, 40);
  // cue fadeout animation
}

function advanceDialogue() {
  console.log("advancing text");
  $.ajax("server/dialogue.php", {
    data: { advanceDialogue: true },
    contentType: "application/json",
    dataType: "json",
    success: function(data, status, xhr) {
      if (data.text.length > 0) {
        dialogue.innerHTML = data.text;
      } else {
        if (data.dialogue == 0) {
          dialogue.style.display = "none";
          startRoom();
        }
      }
    },
    error: function(xhr, errortype, exception) {
      // console.error("REQUEST UTTERLY FAILED!", errortype, exception);
      alert(
        "There was a server error. Try again later. ",
        errortype,
        exception
      );
    }
  });
}

function startRoom() {
  let finalX = -wren.width;
  createjs.Tween.get(wren)
    .to(
      {
        x: finalX
      },
      200,
      createjs.Ease.elasticInOut()
    )
    .call(function() {
      wren.visible = false;
      startRoom2();
    });

  let finalY = windowHeight;
  createjs.Tween.get(textBox)
    .to(
      {
        y: finalY
      },
      200,
      createjs.Ease.elasticInOut()
    )
    .call(function() {
      textBox.visible = false;
    });
}

function startRoom2() {
  startedRoom = true;
  bg.interactive = true;

  tutorMaterials.cursor = "pointer";
  tutorMaterials.interactive = true;

  resume.cursor = "pointer";
  resume.interactive = true;

  poster.cursor = "pointer";
  poster.interactive = true;

  computer.cursor = "pointer";
  computer.interactive = true;
  computer.on("pointerdown", function() {
    alert("beep boop I'm a computer");
  });

  arrow.cursor = "pointer";
  arrow.interactive = true;

  instructions.text = "Click on objects around the room to progress.";
  instructions.pivot.x = instructions.width / 2;
  createjs.Tween.get(instructions)
    .to(
      {
        alpha: 1
      },
      200,
      createjs.Ease.elasticInOut()
    )
    .call(function() {
      setTimeout(function() {
        createjs.Tween.get(instructions)
          .to({ alpha: 0 }, 200, createjs.Ease.elasticInOut())
          .call(function() {
            instructions.visible = false;
          });
      }, 3000);
    });
}

function gameLoop(delta) {
  if (busy) {
    app.stage.interactive = false;
  } else {
    app.stage.interactive = true;
  }

  let mousex;
  let mousey;
  const smoothSpeed = 0.06;
  let mouseEvent = app.renderer.plugins.interaction.eventData.data;
  if (mouseEvent) {
    mousex = mouseEvent.global.x;
    mousey = mouseEvent.global.y;

    if (!stopPan && startedRoom && mouseEvent.pointerType == "mouse") {
      // TODO: INCLUDE TOUCH

      let offsetx = 100; // amount of pan area to cut off
      let offsety = 100;

      // 3. (attempt3)
      let centerx =
        ((windowWidth + 2 * offsetx) / -windowWidth) * mousex +
        windowWidth +
        offsetx;
      let centery =
        ((windowHeight + 2 * offsety) / -windowHeight) * mousey +
        windowHeight +
        offsety;

      let desiredroomx = centerx - bgWidth / 2;
      let desiredroomy = centery - bgHeight / 2;

      // cut bounds
      if (desiredroomx < windowWidth - bgWidth) {
        desiredroomx = windowWidth - bgWidth;
      }
      if (desiredroomy < windowHeight - bgHeight) {
        desiredroomy = windowHeight - bgHeight;
      }
      if (desiredroomx > 0) {
        desiredroomx = 0;
      }
      if (desiredroomy > 0) {
        desiredroomy = 0;
      }

      let smoothx = (1 - smoothSpeed) * bg.x + smoothSpeed * desiredroomx;
      let smoothy = (1 - smoothSpeed) * bg.y + smoothSpeed * desiredroomy;
      bg.x = smoothx;
      bg.y = smoothy;
    }
  }
}

function resize() {
  // get new window size
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  app.renderer.resize(windowWidth, windowHeight);

  // title screen
  let xRatio = titleScreen.width;
  let yRatio = titleScreen.height;
  if (windowWidth / windowHeight > xRatio / yRatio) {
    titleScreen.height = 0.8 * windowHeight;
    titleScreen.width = (xRatio * titleScreen.height) / yRatio;
  } else {
    titleScreen.width = 0.8 * windowWidth;
    titleScreen.height = (yRatio * titleScreen.width) / xRatio;
  }
  titleScreen.x = windowWidth / 2;
  titleScreen.y = windowHeight / 2;

  // scale room (bg, etc) to size
  if (windowWidth / windowHeight > 16 / 9) {
    bgWidth = 1.1 * windowWidth;
    bgHeight = (9 * bgWidth) / 16;
  } else {
    bgHeight = 1.1 * windowHeight;
    bgWidth = (16 * bgHeight) / 9;
  }

  bg.width = bgWidth;
  bg.height = bgHeight;

  soundbutton.x = windowWidth - 40;
  soundbutton.y = 10;
  soundbutton.interactive = true;

  instructions.x = windowWidth / 2;
  instructions.y = windowHeight * 0.1;

  wren.height = 0.95 * windowHeight;
  wren.width = (WREN_IMG_WIDTH / WREN_IMG_HEIGHT) * wren.height;
  wren.y = 0.05 * windowHeight;
  wren.x = 200;

  textBox.x = 0;
  textBox.y = windowHeight - middleBox.height;
  middleBox.x = leftBox.width;
  rightBox.x = windowWidth - rightBox.width;
  middleBox.width = rightBox.x - leftBox.width;

  dialogue.style.top = `${windowHeight - leftBox.height + 90}px`;
  dialogue.style.left = `${leftBox.width}px`;
  dialogue.style.width = `${middleBox.width}px`;
  dialogue.style.height = `${leftBox.height - 90 - 40}px`;

  // if (bg.x < windowWidth - bgWidth) {
  //   bg.x = windowWidth - bgWidth;
  // }
  // if (bg.y < windowHeight - bgHeight) {
  //   bg.y = windowHeight - bgHeight;
  // }
  // if (bg.x > 0) {
  //   bg.x = 0;
  // }
  // if (bg.y > 0) {
  //   bg.y = 0;
  // }
}

function stagePointerDown(event) {
  // check if outside bounds of gui
  let mousex = event.data.global.x;
  let mousey = event.data.global.y;
}
