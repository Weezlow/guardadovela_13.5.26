const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Rectangle creation
function Rect(x, y, width, height, color){
    return {x, y, width, height, color};
}

// Objects (players and ball)
const player1 = Rect(0, (canvas.height - 100) / 2, 20, 100, "white");
const player2 = Rect((canvas.width - 20), (canvas.height - 100) / 2, 20, 100, "white");
const ball = Rect(canvas.width / 2 - 10, canvas.height / 2 - 10, 20, 20, "white");

// Set the ball properties regarding velocity
ball.velocityX = 4;
ball.velocityY = 4;

// Draw reactangles with built in canvas properties
function drawRect(rect){
    context.fillStyle = rect.color;
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
}

// Draw everything
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas first
    drawRect(player1);
    drawRect(player2);
    drawRect(ball);
}

function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.y <= 0 || ball.y + ball.height >= canvas.height){
        ball.velocityY *= -1;
    }
    if (
        (ball.x <= player1.x + player1.width && ball.y + ball.height > player1.y && ball.y < player1.y + player1.height) ||
        (ball.x + ball.width >= player2.x && ball.y + ball.height > player2.y && ball.y < player2.y + player2.height)
    ){
        ball.velocityX *= -1;
    }

    if (ball.x < 0 || ball.x > canvas.width){
        ball.x = canvas.width / 2 - 10;
        ball.y = canvas.height / 2 - 10;
        
        ball.velocityX *= -1;
        ball.velocityY *= Math.random() > 0.5 ? 1 : -1; // Randomly change ball's vertical velocity
    }
}

window.addEventListener('keydown', (event) =>{
    const key = event.key;

    // Move (Right side)
    if (key == 'ArrowUp' && player2.y > 0) player2.y -= 10;
    if (key == 'ArrowDown' && player2.y + player2.height < canvas.height) player2.y += 10;

    // Move player1 (Left side)
    if (key == 'w' && player1.y > 0) player1.y -= 10;
    if (key == 's' && player1.y + player1.height < canvas.height) player1.y += 10;
})

function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop); // TAREA: ¿En qué consiste este método? (UN solo párrafo)
}

gameLoop();