var update_process;

function build(size = 10){

    var game = document.getElementById("game");
    var button = document.getElementById("button");
    button.style.top = (game.getBoundingClientRect().bottom + 30) + "px";
    
    snake.init(game, size);
    apple.init(game, size)

    centralize(game, button);
    reset();
}

function centralize(){

    for (let element of arguments){
        element.style.left = (window.innerWidth / 2 - element.offsetWidth / 2) + "px";
    }
}

function play(){

    var button = document.getElementById("button");
    button.onclick = reset;
    button.innerHTML = "Stop"

    snake.clear();
    snake.increase();
    apple.createNewApple();

    window.addEventListener("keydown", setDirection);
    update_process = setInterval(update, 70);
}

function reset(){

    window.removeEventListener("keydown", setDirection);
    clearInterval(update_process);

    var button = document.getElementById("button");
    button.onclick = play;
    button.innerHTML = "Play";
}

function setDirection(){

    var controls = {
        37: function(){snake.setDirection(snake.left.key)},
        38: function(){snake.setDirection(snake.up.key)},
        39: function(){snake.setDirection(snake.right.key)},
        40: function(){snake.setDirection(snake.down.key)},
    }

    if (controls.hasOwnProperty(event.keyCode)){
        controls[event.keyCode]();
    }
}

function update(){

    snake.move();

    if (snake.collided()){
        reset();

    }else if (snake.collidedWith(apple.element)){
        snake.increase();
        apple.createNewApple();
    }
}