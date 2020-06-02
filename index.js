var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).on("keydown",function(){
  if(started==false)
  {  $("#level-title").css("font-size","3rem");
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

function nextSequence(){
userClickedPattern=[];
   var randomNumber=Math.floor(Math.random()*4);
  level++;
  $("#level-title").text("Level "+level);
var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

$(".btn").click(function(){
  var userChosenColor=this.id;
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(colour)
{
 $("."+colour).addClass("pressed");
 setTimeout(function(){
   $("."+colour).removeClass("pressed");
 },100);
}

function checkAnswer(currentlevel){
 if(gamePattern[currentlevel]==userClickedPattern[currentlevel])
 {
   if(gamePattern.length==userClickedPattern.length)
   {
     setTimeout(nextSequence,1000);
   }
 }
 else{
   playSound("wrong");
   $("body").addClass("game-over");
   setTimeout(function(){
     $("body").removeClass("game-over");
   },200);
   $("#level-title").css("font-size","2rem");
   $("#level-title").text("Game Over, Press Any Key to Restart");
   startOver();
 }
function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
}
