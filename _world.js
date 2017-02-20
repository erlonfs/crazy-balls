/// <reference path="lib/jquery-1.7.1.js" />
/// <reference path="_eGravity.js" />

World = {
    settings: {
        width: 0,
        height: 0,
        gravity: 0,
        hasColision: true
    },

    title: '',

    context: null,

    Elements: [],

    load: function (context) {
        if (context) World.context = context[0].getContext('2d');
        World.settings.width = context.width();
        World.settings.height = context.height();
        World.settings.gravity = eGravity.TERRA;
    },

    update: function () {
        $(World.Elements).each(function (i, item) {
            $(World.Elements).each(function (j, item2) {
                if (World.collision(item, item2)) {
                    item.update(true, true);
                    item2.update(true);
                    Sound.play('sound-of-ball');
                }
                item.update();
            });
        });

    },

    collision: function (Obj1, Obj2) {

        if (Obj1.UID != Obj2.UID) {

            var cateto1 = Obj2.x - Obj1.x;
            var cateto2 = Obj2.y - Obj1.y;

            var distancia = Math.sqrt(cateto1 * cateto1 + cateto2 * cateto2); //hipotenusa

            if (distancia < 0) distancia = -(distancia);

            if (distancia < (Obj1.settings.width + Obj2.settings.width)) {
                //console.log('COLISION! ----> ' + Obj1.name + ' colisao com ' + Obj2.name);
                return World.settings.hasColision;   //colisão 
            }

        }
        return false;

    },

    draw: function () {
        World.clear();
        $(World.Elements).each(function () {
            if (this.draw) {
                this.draw(World.context);
            }
        });
    },

    clear: function () {
        World.context.clearRect(0, 0, World.settings.width, World.settings.height);
    },

    addElement: function (element) {
        World.Elements.push(element);
    }
}

Model = function () {
    this.UID = 0;
    this.name = 'unknown';
    this.image = null;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;

    this.draw = null; //functions
    this.update = null; //functions

    this.settings = {
        movable: false,
        width: 0,
        height: 0,
        weight: 0
    };
}