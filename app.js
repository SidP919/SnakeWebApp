const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
pen.fillStyle = 'yellow';

const cs = 37;//25;
const W = 600;//500; 
const H = 320;//300;//735
let food = null;
let score = 0;

const snake = {
    //initial length of Snake
    init_len: 6,
    //Default direction of the Snake
    direction:"",
    //Cells array contain all the {x,y} for each cell
    cells:[],

    createSnake: function(){

        for(let i = 0; i < this.init_len; i++){
            this.cells.push({
                x:i,
                y:0
            })
        }
    },

    drawSnake: function(){
        for(let cell of this.cells){
            pen.fillRect(cell.x*cs, cell.y*cs, cs-5, cs-5);
        }
    },

    updateSnake: function(){
        //Getting the coordinates for current head of Snake
        const headX = this.cells[this.cells.length-1].x;
        const headY = this.cells[this.cells.length-1].y;

        // Food and Snake head is colliding
        if (headX === food.x && headY === food.y) {
            food = getRandomFood();
            score++;
        } 
        // else {
        //     // Removing the first cell
        //     this.cells.shift();
        // }

        let nextX, nextY;
        
        if(this.direction === 'DOWN'){//if DOWNArrow Key is pressed

            //Getting the coordinates for the next cell to be pushed
            nextX = headX;
            nextY = headY + 1;
            
            if (nextY * cs >= H) {
                clearInterval(id);
                pen.fillStyle = 'lightgreen';
                pen.fillText('Game Over', 50, 100);
            }

            //Removing the first cell
            this.cells.shift();

            //Adding the new cell at nextX, nextY position
            this.cells.push({
                x: nextX,
                y: nextY
            });

        }
        else if(this.direction === 'LEFT'){//if LeftArrow Key is pressed
            
            //Getting the coordinates for the next cell to be pushed
            nextX = headX - 1;
            nextY = headY;

            if (nextX * cs < 0) {
                clearInterval(id);
                pen.fillStyle = 'lightgreen';
                pen.fillText('Game Over', 50, 100);
            }
            
            //Removing the first cell
            this.cells.shift();

            //Adding the new cell at nextX, nextY position
            this.cells.push({
                x: nextX,
                y: nextY
            });

        }
        else if(this.direction === 'UP'){//if UpArrow Key is pressed

            //Getting the coordinates for the next cell to be pushed
            nextX = headX;
            nextY = headY - 1;

            if (nextY * cs < 0) {
                clearInterval(id);
                pen.fillStyle = 'lightgreen';
                pen.fillText('Game Over', 50, 100);
            }
            
            //Removing the first cell
            this.cells.shift();

            //Adding the new cell at nextX, nextY position
            this.cells.push({
                x: nextX,
                y: nextY
            });

        }
        else if(this.direction === 'RIGHT'){//if RightArrow Key is pressed

            //Getting the coordinates for the next cell to be pushed
            nextX = headX + 1;
            nextY = headY;

            if (nextX * cs >= W) {
                clearInterval(id);
                pen.fillStyle = 'lightgreen';
                pen.fillText('Game Over', 50, 100);
            }

            //Removing the first cell
            this.cells.shift();

            //Adding the new cell at nextX, nextY position
            this.cells.push({
                x: nextX,
                y: nextY
            });
        }
    }
}

//Initialise the Game
function init(){
    snake.createSnake();

    food = getRandomFood();
    pen.fillText(`Score ${score}`, 50, 50);

    function changeDirection(e){
        console.log("A Key Pressed!");
        if(e.which === 13){
            console.log('Enter Pressed!');
            snake.direction = ""
        }
        else if(e.key === 'ArrowUp'){
            console.log('Up Pressed!');
            snake.direction = 'UP';
        }
        else if(e.key === 'ArrowDown'){
            console.log('Down Pressed!');
            snake.direction = 'DOWN';
        }
        else if(e.key === 'ArrowRight'){
            console.log('Right Pressed!');
            snake.direction = 'RIGHT';
        }
        else if(e.key === 'ArrowLeft'){
            console.log('Left Pressed!');
            snake.direction = 'LEFT';
        }

        console.log(snake.direction);
    }

    document.addEventListener('keydown',changeDirection);
}

function upDirection(){
    snake.direction = "UP";
}

function downDirection(){
    snake.direction = "DOWN";
}

function rightDirection(){
    snake.direction = "RIGHT";
}

function leftDirection(){
    snake.direction = "LEFT";
}

//draw
function draw(){
    pen.clearRect(0,0,W,H);
    pen.font = '40px sans-serif';
    pen.fillText(`Score ${score}`, 50, 50);
    pen.fillStyle = 'blue';
    pen.fillRect(food.x * cs, food.y * cs, cs-5, cs-5);
    pen.fillStyle = 'rgba(255, 238, 0, 0.651)';
    snake.drawSnake();
}

//Update
function update(){
    snake.updateSnake();
}

//Random Food
function getRandomFood() {
    
    const foodX = Math.floor(Math.random() * (W - cs)/cs);
    const foodY = Math.floor(Math.random() * (H - cs)/cs);


    const food = {
        x: foodX,
        y: foodY
    }

    return food;
}

//Loops the game
function gameLoop(){
    draw();
    update();
}

//Calling the init function to initialize the Snake Game.
init();

const id = setInterval(gameLoop, 100);
