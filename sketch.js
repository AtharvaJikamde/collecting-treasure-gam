var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var treasuresLifeTime = 300;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  pathImg = loadImage("https://assets.editor.p5js.org/5fa635de70c0e30024d9557a/e1c661ee-e5fa-4d60-a47b-1c12dc7dc55f.png");
  boyImg = loadAnimation("https://assets.editor.p5js.org/5fa635de70c0e30024d9557a/a656a4c6-5a25-4299-ba3b-e1d11c40e176.png", "https://assets.editor.p5js.org/5fa635de70c0e30024d9557a/68f37861-4b71-4ebd-afab-babd94ecd78b.png");
  cashImg = loadImage("https://assets.editor.p5js.org/5fa635de70c0e30024d9557a/55df43c9-2fd0-4101-97fd-6ea57e9a6ed2.png");
  diamondsImg = loadImage("https://assets.editor.p5js.org/5fa635de70c0e30024d9557a/fe29bdbc-576a-453e-88aa-02fa7ccb9bf3.png");
  jwelleryImg = loadImage("https://assets.editor.p5js.org/5fa635de70c0e30024d9557a/e3076434-0287-42af-a559-d9451f9f637c.png");
  swordImg = loadImage("https://assets.editor.p5js.org/5fa635de70c0e30024d9557a/061543ce-9352-47bd-9048-7210296549d7.png");
  endImg = loadAnimation("https://assets.editor.p5js.org/5fa635de70c0e30024d9557a/da12431e-fb81-42a2-8788-75815e265aff.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  // Moving background
  path = createSprite(windowWidth * 0.5, windowHeight * 0.5);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70, 580, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  if (gameState === PLAY) {
    background(0);
    boy.x = World.mouseX;

    edges = createEdgeSprites();
    boy.collide(edges);

    //code to reset the background
    if (path.y > windowHeight) {
      path.y = height / 2;
    }
    boy.setCollider("rectangle", 0, 0, 1000, 1000);

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG[0].destroy();
      treasureCollection = treasureCollection + 50;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG[0].destroy();
      treasureCollection = treasureCollection + 100;

    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG[0].destroy();
      treasureCollection = treasureCollection + 150;

    } else {
      if (swordGroup.isTouching(boy)) {
        gameState = END;

        boy.addAnimation("SahilRunning", endImg);
        boy.x = windowWidth * 0.5;
        boy.y = windowHeight * 0.5;
        boy.scale = 0.6;

        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();

        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);

      }
    }

    drawSprites();
    textSize(20);
    fill("black");
    text("Treasure: " + treasureCollection, windowWidth * 0.5 - 50, 30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = treasuresLifeTime;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 100 == 0) {
    var diamonds = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = treasuresLifeTime;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 100 == 0) {
    var jwellery = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = treasuresLifeTime;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 100 == 0) {
    var sword = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = treasuresLifeTime;
    swordGroup.add(sword);
  }
}