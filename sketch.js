var trex , treximg ,  trex_collided;
var ground , groundimg;
var invground;
var cloud , cloudimg , CloudsGroup;
var obstacle , obstacle1 , obstacle2 , obstacle3 , obstacle4 , obstacle5 , obstacle6 , ObstaclesGroup;
var count;
var gameState = "play";
var gameOver , restart , gameOverimg , restartimg;
var score, jump, checkpoint, die , bird , birdimg;

score = 0;

function preload(){
  
  treximg = loadAnimation("trex1.png" , "trex3.png" , "trex4.png");
  groundimg = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  trex_collided = loadAnimation("trex_collided.png");
  birdimg = loadImage("44.png");
  
  jump = loadSound("jump.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
}

function setup() {
  
  createCanvas(600, 200);
  
  trex = createSprite (30,180,20,30);
  trex.addAnimation("animation" , treximg);
  trex.addAnimation("collided" , trex_collided);
  trex.scale = 0.5
  
  //trex.debug = true;
  
  ground = createSprite(300,180,600,20);
  ground.addImage(groundimg);
  
  invground = createSprite(300,190,600,10);
  invground.visible = false;
  
  CloudsGroup =  new Group();
  ObstaclesGroup = new Group();
  
  gameOver = createSprite(300,70,300,70);
  gameOver.addImage(gameOverimg);
  
  restart = createSprite(300,110,30,30);
  restart.addImage(restartimg);
  restart.scale = 0.5;
  
  
  
}

function draw() {
  
  background(0,255,255);
  trex.collide(invground);
  
  
  
  if(gameState === "play"){
    
    //console.log(World.frameRate);
    textSize(15);
    text("score-:  " + score , 500 , 50 );
    score = score + Math.round(World.frameRate/60);
    restart.visible = false;
    gameOver.visible = false;
    
    if(score === 100){
      checkpoint.play();
    }
    
if(keyDown("space") && trex.y >= 147){
trex.velocityY = -10;
  jump.play();
  }
    
trex.velocityY = trex.velocityY + 0.8;

ground.velocityX = -6
    
if (ground.x < 0){
ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnObstacles();
  birds();
    if(ObstaclesGroup.isTouching(trex)){
      gameState = "end";
      die.play();
    }
    
  }

  if(gameState === "end" ){
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    restart.visible = true;
    gameOver.visible = true;
    
trex.changeAnimation("collided",trex_collided);
    
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  
  drawSprites();
}

function reset(){
gameState = "play";
restart.visible = false;
gameOver.visible = false;
CloudsGroup.destroyEach();
ObstaclesGroup.destroyEach();
trex.changeAnimation("treximg" , treximg);
score = 0;
}

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = -1;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6);

    var rand = Math.round(random(1,6));
    switch(rand) { 
      case 1: obstacle.addImage(obstacle1); 
break; 
case 2: obstacle.addImage(obstacle2); 
break; 
case 3: obstacle.addImage(obstacle3); 
break; 
case 4: obstacle.addImage(obstacle4); 
break; 
case 5: obstacle.addImage(obstacle5); 
break; 
case 6: obstacle.addImage(obstacle6);
break; 
default: 
break; }
         
    obstacle.scale = 0.5;
    obstacle.lifetime = -1;

    ObstaclesGroup.add(obstacle);
  }
}

function birds(){
  if(frameCount % 90 === 0){
  var bird = createSprite(600,90,10,10);
  bird.velocityX = -3;
  bird.y = Math.round(random(80,180));
  bird.addImage(birdimg);
  bird.scale = 0.2;
}
}
