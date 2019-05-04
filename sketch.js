var l;

function setup() {
    createCanvas(640, 480);
    l = new movingLine(100, 100, 0, 1);
}

function draw() {
    background(0);
    l.move();
    l.show();
}
//add create lines on mouse press, fix lines, add squares, add creation
//rect(x, y, width, height)

class movingLine {
    constructor(x, y, dirx, diry) {
        this.x = x;
        this.y = y;
        this.dirx = dirx;
        this.diry = diry;
        this.size = 1;
        this.history = [];
        this.historyCount = 0;
    }
    move() {
        this.x += this.dirx;
        this.y += this.diry;
        var v = createVector(this.x, this.y);
        this.history.push(v);
        this.historyCount++;
        if(this.history.length > 100)
        {
            this.history.splice(0, 1);
        }
        for(var i = 0; i < this.history.length; i++) {
            var pos = this.history[i];
            point(pos.x, pos.y);
        }
        if(this.historyCount % 20 == 0)
        {
            this.turn();
        }
    }
    show() {
        stroke(255, 136, 0);
        strokeWeight(2);
        noFill();
        //line(this.x, this.y, this.x + this.size * this.dirx, this.y + this.size * this.diry);
        point(this.x, this.y);
    }
    turn(){
        if(Math.abs(this.dirx) > Math.abs(this.diry)){
            this.diry = Math.round(random(2) - 1);
        }
        else{
            this.dirx = Math.round(random(2) - 1);
        }
    }
}
