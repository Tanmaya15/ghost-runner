var gameState = "play";
var end;
var tower,towerImage;
var doorImg;
var climberImg;
var ghost,ghostImg;
var invisibleBlockGroup, invisibleBlock;
var sound;

function preload(){
  towerImage=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=2;
  
 doorsGroup=new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
   sound.loop();
  
}
function draw(){
  background("white");
 
  if(gameState==="play"){
    
  if(tower.y>600){
    tower.y=300;
    
  
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
  { 
    ghost.destroy();
    gameState="end";
  }
  spawnDoor();
    drawSprites();
  }
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("game over",230,250);
  }
}
function spawnDoor(){
  if(frameCount%240===0){
    var door = createSprite(200,-50);
  door.addImage(doorImg);
    door.x=Math.round(random(120,400))
    door.velocityY=1;
    door.lifetime=800;
    doorsGroup.add(door);
    
    var climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=800;
    climbersGroup.add(climber);
    
    var invisibleBlock = createSprite(200,15); invisibleBlock.width = climber.width; 
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x; 
    invisibleBlock.velocityY = 1;
   // invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
  }
  
  
}
