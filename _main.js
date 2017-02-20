/// <reference path="lib/jquery-1.7.1.js" />
/// <reference path="_eGravity.js" />
/// <reference path="_world.js" />

Game = {
    settings: {
        velocity: 10,
        defaultDistance: 1
    },

    context: null,

    load: function (context) {
        World.load(context);
        Game.init();
    },

    init: function () {

        var cores = ["blue", "red", "green", "orange", "black", "gray"];

        for (var i = 0; i < cores.length; i++) {

            bola = new Model();
            bola.name = "Bola " + cores[i];
            bola.UID = i;            
            bola.settings.width = 17; //largura
            bola.settings.height = 17; //altura
            bola.settings.weight = 0.1; //peso

            //Coordenadas
            bola.x = 0 + (45 * i);
            bola.y = 400 - (45 * i);
            bola.color = cores[i];
            bola.dx = 1;
            bola.dy = 1;

            bola.draw = function (ctx) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.settings.width, this.settings.height, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            };

            bola.update = function (colisao, pos) {
                if (colisao) {
                    if (pos) {
                        if ((this.x - this.settings.width) <= 0) {
                            this.dx = Game.settings.defaultDistance;
                        }
                        if ((this.y - this.settings.height) <= 0) {
                            this.dy = Game.settings.defaultDistance;
                        }
                    } else {
                        this.dx = -this.dx;
                        this.dy = -this.dy;
                    }
                } else {

                    if ((this.x + this.settings.width) >= World.settings.width) {
                        this.dx = -this.dx;
                    }

                    if ((this.x - this.settings.width) <= 0) {
                        this.dx = Game.settings.defaultDistance;
                    }

                    if ((this.y + this.settings.height) >= World.settings.height) {
                        this.dy = -this.dy;
                    }

                    if ((this.y - this.settings.height) <= 0) {
                        this.dy = Game.settings.defaultDistance;
                    }

                }

                this.x += this.dx;
                this.y += this.dy;

            };

            World.addElement(bola);
        }

        setInterval('Game.run()', Game.settings.velocity);
    },

    run: function () {
        Game.update();
        Game.draw();
    },

    update: function () {
        World.update();
    },

    draw: function () {
        World.draw();
    }


}