var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var ground, invisibleGround
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");


}



function setup() {
  createCanvas(400, 400);

  monkey = createSprite(50, 340, 20, 50)
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;



  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");

  stroke("black");
  fill("black");
  textSize(20);

  text("Survival Time:" + survivalTime, 140, 50);


  stroke("black");
  fill("black");
  textSize(20);
  text("Score:" + score, 170, 70);

  survivalTime = Math.ceil(frameCount / frameRate());
  
 
  monkey.collide(ground);

  if (gameState === PLAY){

     if (FoodGroup.isTouching(monkey)) {

    FoodGroup.destroyEach();
    score = score + 1;

  }


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 250) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;


    if (obstacleGroup.isTouching(monkey)) {

      gameState = END;
    }
  }

   else if (gameState === END) {
       if(obstacleGroup.isTouching(monkey)){
        survivalTime = 0;
        score = 0;
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);

       }
    }



    Food();
    obstacles();
    drawSprites();
  
}

function Food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 350, 40, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 190));
    banana.scale = 0.1;
    monkey.depth = banana.depth + 1;
    banana.velocityX = -3;
    banana.lifetime = 200;

    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(250, 325, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }

}