const apple = {

    game: null,
    element: null,
    size: null,

    init: function(game, size){
        
        this.game = game;
        this.size = size;
    },

    createNewApple: function(){

        this.remove();

        var element = document.createElement("div");
        element.setAttribute("id", "apple");

        element.style.width = this.size + "px";
        element.style.height = this.size + "px";

        // Obtém uma posição aleatória.
        var left = Math.floor(Math.random() * (this.game.offsetWidth - this.size + 1));
        var top = Math.floor(Math.random() * (this.game.offsetHeight - this.size + 1));

        // A posição deve ser divisível pelo seu tamanho.
        left -= left % this.size;
        top -= top % this.size;

        element.style.left = left + "px";
        element.style.top = top + "px";

        this.element = element;
        this.game.appendChild(element);
    },

    remove: function(){

        if(this.element){
            this.game.removeChild(this.element);
            this.element = null;
        }
    }
}