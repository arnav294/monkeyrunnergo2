var backImage,backgr;
var player, player_running,player_jumping;
var ground,ground_img;
var bananaImage;
var witch,fireball,stone,witchIfireballI;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0
var rand

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  fireballI = loadImage("fireball.jpg");
  witchI = loadImage("Monkey catcher.png");
  player_jumping = loadImage("Monkey_01.png")
}

function setup() {
  createCanvas(displayWidth-100,displayHeight-10);
  
  backgr=createSprite(displayHeight*0.1,displayWidth*0.3,100,400);
  backgr.addImage(backImage);
  backgr.scale=1.9;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(500,740,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,750,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  rand = random(10,300)



  foodGroup = createGroup();
  fireballGroup = createGroup();
  witchGroup = createGroup();
}

function draw() { 
  background(0);
  textSize(20)
  fill("red");
  text("Score"+score,700,100);


  if(gameState===PLAY){

  spawnFood();
  spawnWitch();
  spawnFireball();


  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if(player.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score += 2
    player.scale += + 0.003
   
  }

    if(keyDown("space") ) {
      player.velocityY = -6;
      
      player.changeAnimation(player_jumping);
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    if(player.isTouching(fireballGroup)){
     gameState = END;
    }
   if(player.scale === 0.5){
    player.velocityY = 0;
    backgr.velocityX = 0;
    witchGroup.setVelocityYEach(0);

    fireballGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    witchGroup.setLifetimeEach(-1);
    fireballGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
   }
   
  } else if(gameState === END){
    player.velocityY = 0;
    backgr.velocityX = 0;
    witchGroup.setVelocityYEach(0);

    fireballGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    witchGroup.setLifetimeEach(-1);
    fireballGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    


    

  }

  drawSprites();

  if(player.isTouching(fireballGroup)){

  textSize(20)
  fill(255)
  text("gameOver!",500,200); 
}
if(player.scale === 0.2){
  textSize(20)
    text("Monkey has now gone happy and escaped from witches,you won the game",300,200)
  
}

  textSize(30)
  fill("red");
  text("Score :"+score,650,100);

}

function spawnFood(){
    if(frameCount % 80 === 0){
      var banana = createSprite(800,250,40,10);
      banana.y = random(120,200);
      banana.addImage(bananaImage);
      banana.scale = 0.05;
      banana.velocityX = -4;

      banana.lifetime = 300;
      player.depth = banana.depth + 1;
      foodGroup.add(banana);
    }
  }

function spawnWitch(){
    if(frameCount % 70 === 0){
       witch = createSprite(100,rand,40,10);
      witch.y = random(10,400);
      witch.addImage(witchI);
      witch.scale = 0.25;
      witch.velocityY = 2;
      witch.lifetime = 300;
      witchGroup.add(witch)
    
    }

}
function spawnFireball(){
  if(frameCount % 70 === 0){
   fireball = createSprite(witch.x,witch.y,40,10);
   fireball.addImage(fireballI);
   fireball.scale = 0.3;
   fireball.velocityX = 5;

  fireball.lifetime = 300;
   fireballGroup.add(fireball);

  }
}
