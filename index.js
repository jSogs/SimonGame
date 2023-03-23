const map = new Map();
map.set(1,"red");
map.set(2,"blue");
map.set(3,"green");
map.set(4,"yellow");
var gamePattern = new Array();
var userPattern = new Array();
var level;
var isStarted = false;
var index = 0;

$(document).on("keydown", function () {
    if (!isStarted){
        level = 0;
        nextSequence();
        isStarted = true;
    }
});

$(".bttn").on("click", function(){
    if (isStarted === true){
        userPattern.push($(this).attr("id"));
        playSound($(this).attr("id"));
        animatePress($(this).attr("id"));
        checkGame(userPattern.length);
    }
});

function nextSequence(){
    userPattern.length=0;
    level++;
    $("#level-title").text("Level "+level);
    var rand = 1 + Math.floor(Math.random()*4);
    gamePattern.push(map.get(rand));
    $("." +map.get(rand)).fadeOut(100).fadeIn(100);
    playSound(map.get(rand));
}

function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function animatePress(color){
    $("."+color).addClass("pressed");
    setTimeout(function (){
        $("."+color).removeClass("pressed");
    },50);
}

function checkGame(i){
        if (gamePattern[i-1] === userPattern[i-1] && gamePattern.length === userPattern.length) {
            setTimeout(nextSequence,1000);
        } else if (gamePattern[i-1] != userPattern[i-1]){
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("#level-title").text("Game Over, Press Any Key to Play Again");
            restart();
        }
}

function restart(){
    isStarted = false;
    gamePattern.length = 0;
    userPattern.length = 0;
    level = 0;
}