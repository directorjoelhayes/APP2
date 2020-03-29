var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//c is short for context
var c = canvas.getContext('2d');

// Rect ----------
//c.fillRect(x, y, width, heigth);
//c.fillStyle = 'rgba(0,255,40,1)';
//c.fillRect(100, 100, 100, 100);
//c.fillStyle = 'rgba(0,75,255,1)';
//c.fillRect(500, 200, 100, 100);
//console.log(canvas);

// Line ------------
//c.beginPath();
//c.moveTo(x, y)
///c.moveTo(50, 300);
//c.lineTo(x, y)
//c.lineTo(300, 100);
//c.lineTo(400, 300);
//c.strokeStyle = 'rgba(40,120,200,1)';
//c.stroke();

// arc / circle ---------
//c.arc(x , y , r , startAngle(radiant) , endAngle(radiant) , tekenrichting)
//c.beginPath();
//c.arc(300,300,30,0, Math.PI * 2, false );
//c.strokeStyle = 'gray';
//c.stroke();

var mouse = {
    x : undefined,
    y : undefined
}

var maxradius = 15;


var colorArray = [
    '#333333',
    '#BFBFBF',
    '#828282',
    '#595959',
    '#737373'
]

window.addEventListener('mousemove' , function ( event ){
    mouse.x = event.x;
    mouse.y = event.y;
    
})

function Circle(x , y , dx , dy , radius, randomcolor) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minradius = radius
    this.randomcolor = randomcolor
    this.color = colorArray[ Math.floor(Math.random() * colorArray.length) ];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //c.strokeStyle = this.randomcolor;
        c.fillStyle = this.color;
        c.fill();
        //c.stroke();

    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {
            if (this.radius < maxradius)
            this.radius += 1;
        } else if (this.radius > this.minradius) {
            this.radius -= 1;
        }
 
        this.draw();

    }
}

var circleArray = [];


for (var i = 0; i < 70; i++) {
    var radius = Math.random() * 4 + 2;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight- radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 1;
    var dy = (Math.random() - 0.5) * 1;
    var randomcolor = "#" + ("000000" + Math.floor(Math.random() * 16777216).toString(16)).substr(-6);
    circleArray.push(new Circle(x,y,dx,dy,radius,randomcolor));
}

console.log(circleArray);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

animate();