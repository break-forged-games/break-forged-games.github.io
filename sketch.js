let lines = [];
let squares = [];
let step = 0;

function setup() {
    createCanvas(640, 480);
}

function draw() {
    background(0);
    for(var i = 0; i < lines.length; i++) {
        //if(lines[i].history[0].x > width || lines[i].history[0].y > height || lines[i].history[0].x < 0 || lines[i].history[0].y < 0) {
        //if(lines[i].x > width || lines[i].y > height || lines[i].x < 0 || lines[i].y < 0) {
        if((lines[i].history[0].x > width || lines[i].history[0].y > height || lines[i].history[0].x < 0 || lines[i].history[0].y < 0) && (lines[i].x > width || lines[i].y > height || lines[i].x < 0 || lines[i].y < 0)) {
        }
        else{
            lines[i].move();
            lines[i].show();
        }
    }
    if(step % 20 == 0) {
        var xx = 0;
        var yy = 0;
        while(xx == 0 && yy == 0) {
            xx = Math.round(random(-1, 1));
            yy = Math.round(random(-1, 1));
        }
        lines.push(new movingLine(random(width), random(height), xx, yy));
        
        if(step % 40 == 0) {
            squares.push(new fadingSquare(random(width), random(height)));
        }
    }

    for(var a = 0; a < squares.length; a++) {
        if(squares[a].x > width || squares[a].y > height || squares[a].x < 0 || squares[a].y < 0) {

        }
        squares[a].show();
    }
    step++;
}
//add create lines on mouse press, fix lines, add squares, add creation

class fadingSquare {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.a = 0.01;
        this.alphaI = 0.01;
    }
    show() {
        strokeWeight(2);
        stroke('rgba(255, 136, 0, ' + this.a + ')');
        noStroke();
        fill('rgba(255, 136, 0, ' + this.a + ')');
        if(this.a <= 0)
        {
            noFill();
        }
        rect(this.x, this.y, 15, 15);
        if(this.a > 1) {
            this.alphaI *= -1;
        }
        this.a += this.alphaI;
    }
}


class movingLine {
    constructor(x, y, dirx, diry) {
        this.x = x;
        this.y = y;
        this.dirx = dirx;
        this.diry = diry;
        this.size = 1;
        this.history = [];
        this.history[0] = createVector(this.x, this.y);
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
        if(this.historyCount % 25 == 0)
        {
            this.turn();
        }
    }
    show() {
        stroke(255, 136, 0);
        strokeWeight(2);
        noFill();
        //point(this.x, this.y);
    }
    turn(){
        if(Math.abs(this.dirx) > Math.abs(this.diry)){
            this.diry = Math.round(random(2) - 1);
        }
        else {
            this.dirx = Math.round(random(2) - 1);
        }
        /* //allows them to become horizontal again
        else if (Math.abs(this.diry) > Math.abs(this.dirx)) {
            this.dirx = Math.round(random(2) - 1);
        }
        else {
            var choose = random()
            if(choose >= .5) {
                this.diry = Math.round(random(2) - 1);
            }
            else {
                this.dirx = Math.round(random(2) - 1);
            }
        }
        */
    }
}
