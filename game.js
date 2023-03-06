
var gamePattern=[]
var buttonColours = ["red", "blue", "green", "yellow"]
var userClickedPattern =[];
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length -1);
})

var level =0
function nextSequence (){
    userClickedPattern=[]
    var randomNumber = Math.random()*4
    randomNumber= Math.floor(randomNumber)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playsound(randomChosenColour)
    level +=1;
    $("h1").text("Level "+level);
    
}
function playsound(name){
    var audio = new Audio ("sounds/"+name+".mp3")
    audio.play()
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(() =>{
        $("#"+currentColour).removeClass("pressed")
    },100)
}
var started = false
$(document).keydown(function(){
    if (!started){
        $("h1").text("Level "+level);
        nextSequence();
        started =true
    }
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if (gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playsound("wrong")
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
};

function startOver(){
    level =0;
    gamePattern=[];
    started = false;
}

