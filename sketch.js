var mainCarImg, muddyRoadImg, brokenRoadImg, roadImg;
var muddyRoadAccidentImg, brokenCar;
var bg;
var mainCar, muddyRoad, brokenRoad;
var muddyRoadGroup, brokenRoadGroup;

function preload(){
   roadImg = loadImage("images/Road.jpe");
   mainCarImg = loadImage("images/Main Car.png");
   muddyRoadImg = loadImage("images/Muddy Road.png");
   brokenRoadImg = loadImage("images/Broken Road.png");
   muddyRoadAccidentImg = loadImage("images/MuddyRoadAccident.png");
   brokenCar = loadImage("images/Broken Car.png");
}

  function setup() {
  createCanvas(1000,570);
  bg = createSprite(500,900,400,400);
  bg.addImage("road",roadImg);
  bg.velocityY = 3;
  bg.scale = 0.8;

  mainCar = createSprite(200,480,400,400);
  mainCar.addImage("main",mainCarImg);
  mainCar.scale = 0.8;
  mainCar.setCollider("rectangle",0,0,100,240)

  muddyRoadGroup = createGroup();
  brokenRoadGroup = createGroup();
}

function draw() {
  background("black");  

  if(bg.y > 350){
    bg.y = height/2;
  }

  if(keyDown(LEFT_ARROW)){
    mainCar.x = mainCar.x - 5;
  }

  if(keyDown(RIGHT_ARROW)){
    mainCar.x = mainCar.x + 5;
  }

  spawnMuddyRoad();
  spawnBrokenRoad();

  if(brokenRoadGroup.isTouching(mainCar)){
    mainCar.addImage("broke",brokenCar);
    mainCar.changeAnimation("broke",brokenCar);
    bg.velocityY = 0;
    muddyRoadGroup.setVelocityYEach(0);
    brokenRoadGroup.setVelocityYEach(0);
  }

  if(muddyRoadGroup.isTouching(mainCar)){
    mainCar.addImage("mud",muddyRoadAccidentImg);
    mainCar.changeAnimation("mud",muddyRoadAccidentImg);
    mainCar.scale = 0.5;
    bg.velocityY = 0;
    muddyRoadGroup.setVelocityYEach(0);
    brokenRoadGroup.setVelocityYEach(0);
  }

  drawSprites();
}

function spawnMuddyRoad(){
  if(frameCount % 200 === 0){
    muddyRoad = createSprite(Math.round(random(270, 750)),20,400,400);
  muddyRoad.addImage("muddy",muddyRoadImg);
  muddyRoad.velocityY = 3;
  muddyRoad.scale = 3;
  muddyRoad.debug = true;
  muddyRoad.setCollider("rectangle",0,0,40,30);
  mainCar.depth = muddyRoad.depth;
  mainCar.depth = mainCar.depth + 1;

  muddyRoadGroup.add(muddyRoad);
}
}

function spawnBrokenRoad(){
  if(frameCount % 300 === 0){
  brokenRoad = createSprite(Math.round(random(270, 750)),20,400,400);
  brokenRoad.addImage("broken",brokenRoadImg);
  brokenRoad.velocityY = 3;
  brokenRoad.scale = 0.7;
  brokenRoad.debug = true;
  brokenRoad.setCollider("rectangle", 0,0,200,200);
  mainCar.depth = brokenRoad.depth;
  mainCar.depth = mainCar.depth + 1;
  brokenRoadGroup.add(brokenRoad);
}
}