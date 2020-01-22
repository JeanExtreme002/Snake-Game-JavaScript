const snake = {

    body: [],
    direction: null,
    size: null,
    game: null,

    clear: function(){

        for(let element of this.body){
            this.game.removeChild(element);
        }
        this.body.splice(0, this.body.length);
    },

    collided: function(){

        for (let element of this.body.slice(1, this.body.length)){
            if (this.collidedWith(element)){
                return true;
            }
        }
        return false;
    },

    collidedWith: function(element){

        var {left: head_left, top: head_top} = this.getPositionOf(this.body[0]);
        var {left: element_left, top: element_top} = this.getPositionOf(element);

        if (head_left === element_left && head_top === element_top){
            return true;
        }
        return false;
    },

    getPositionOf: function(element){

        var game_rect = this.game.getBoundingClientRect();
        var element_rect = element.getBoundingClientRect();

        return {left: element_rect.left - game_rect.left, top: element_rect.top - game_rect.top};
    },

    increase: function(){

        var element = document.createElement("div");
        element.setAttribute("class", "snake");

        element.style.width = this.size + "px";
        element.style.height = this.size + "px";

        // Caso a cobra ainda não possua um corpo, a posição será o centro da tela.
        if (this.body.length < 1){

            var left = Math.round(this.game.offsetWidth / 2);
            var top = Math.round(this.game.offsetHeight / 2);

            left -= left % this.size;
            top -= top % this.size;

        // Caso a cobra já possua um corpo, a posição será a mesma do último elemento.
        }else{
            var {left, top} = this.getPositionOf(this.body[this.body.length - 1]);
        }

        this.setPositionOf(element, left, top);

        this.body.push(element);
        this.game.appendChild(element);
    },

    init: function(game, size){

        this.game = game
        this.size = size;

        this.up = {speed: [0, -size], key: 0};
        this.down = {speed: [0, size], key: 1};
        this.left = {speed: [-size, 0], key: 2};
        this.right = {speed: [size, 0], key: 3};

        this.setDirection();
    },

    move: function(){

        var head = this.body[0];
        var {left: head_left, top: head_top} = this.getPositionOf(head);

        var lastPosition = [head_left, head_top];

        head_left += this.direction.speed[0];
        head_top += this.direction.speed[1];

        // Verifica se a cobra ultrapassou os limites da tela no eixo X.
        head_left = head_left < 0 ? this.game.offsetWidth - this.size : head_left;
        head_left = head_left + this.size > this.game.offsetWidth ? 0 : head_left;

        // Verifica se a cobra ultrapassou os limites da tela no eixo Y.
        head_top = head_top < 0 ? this.game.offsetHeight - this.size : head_top;
        head_top = head_top + this.size > this.game.offsetHeight ? 0 : head_top;

        this.setPositionOf(head, head_left, head_top);

        // Move o resto do corpo da cobra, onde a posição dos elementos 
        // será a mesma dos seus antecessores.
        for (let element of this.body.slice(1, this.body.length)){

            let currentPosition = this.getPositionOf(element);

            this.setPositionOf(element, lastPosition[0], lastPosition[1]);
            lastPosition = [currentPosition.left, currentPosition.top];
        }
    },

    setDirection: function(direction = null){

        this.direction = !this.direction ? this.up : this.direction;

        if (direction === this.up.key && this.direction.key !== this.down.key){
            this.direction = this.up;

        }else if (direction === this.down.key && this.direction.key !== this.up.key){
            this.direction = this.down;

        }else if (direction === this.left.key && this.direction.key !== this.right.key){
            this.direction = this.left;

        }else if (direction === this.right.key && this.direction.key !== this.left.key){
            this.direction = this.right;
        }
    },

    setPositionOf: function(element, left, top){

        element.style.left = left + "px";
        element.style.top = top + "px";
    }
}