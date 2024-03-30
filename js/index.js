let cnv = document.querySelector("#my-canvas");
let scoreCount = document.querySelector(".scores");
let bestScores = document.querySelector(".best-scores");

let ctx = cnv.getContext("2d");
let scale = 10;
let rows = cnv.width / scale;
let columns = cnv.height / scale;

// snake function;
function Snake() {
  this.x = 10;
  this.y = 10;
  this.xSpeed = scale;
  this.ySpeed = 0;

  this.scoreValue = 0;
  this.maxScore = localStorage.getItem('hight-score') || 0;

  this.total = 0;
  this.tail = [];

  // drow snake;
  this.drowSnake = () => {
    ctx.fillStyle = "rgb(0,180,255)";

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  };

  // updated LoCATION;
  this.updateLocation = () => {
    
    for (let i = 0; i < this.tail.length - 1; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        this.total = 2;
        bestScores.innerHTML = this.maxScore;
      }
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // controls the snake game;
    if (this.x > cnv.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = cnv.width;
    } else if (this.y > cnv.height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = cnv.height;
    }
  };

  // userDirections in keyboard keys;
  this.userDirection = (user) => {
    switch (user) {
      case "Left":
        this.xSpeed = -scale;
        this.ySpeed = 0;
        break;
      case "Right":
        this.xSpeed = scale;
        this.ySpeed = 0;
        break;
      case "Up":
        this.xSpeed = 0;
        this.ySpeed = -scale;
        break;
      case "Down":
        this.xSpeed = 0;
        this.ySpeed = scale;
        break;
    }
  };

  this.isEatFood = (food) => {
    if (this.x === food.x && this.y === food.y) {
      this.total++;
      return true;
    }
    
    this.scoreValue = this.total;
    scoreCount.innerHTML = this.scoreValue;
    this.maxScore = this.scoreValue >= this.maxScore ? this.scoreValue : this.maxScore;
    localStorage.setItem('high-score', this.maxScore);

    return false;
  };
}

// foods for the snake animals;
function Food() {
  this.x;
  this.y;

  // drow the snake animal;
  this.drowFood = () => {
    ctx.fillStyle = "rgb(255,50,0)";
    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.generateRandomPosition = () => {
    this.x = Math.floor(Math.random() * rows) * scale;
    this.y = Math.floor(Math.random() * columns) * scale;
  };
}

window.addEventListener("load", () => {
  let snake = new Snake();
  let food = new Food();

  food.generateRandomPosition();

  setInterval(() => {
    // this block is runed the snake;
    //{
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    // this block is for drowd food for snake;
    //{
    food.drowFood();
    //}

    snake.drowSnake();
    snake.updateLocation();
    //}

    // this block is for the eating foood by snake;
    //{
    if (snake.isEatFood(food)) {
      food.generateRandomPosition();
    }
    //}
  }, 50);

  window.addEventListener("keydown", (event) => {
    let userDirection = event.key.replace("Arrow", "");
    snake.userDirection(userDirection);
  });
});
