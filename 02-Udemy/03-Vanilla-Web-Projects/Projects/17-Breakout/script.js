const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/////////////////////////////////////////////

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

// Create ball props
const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	size: 10,
	speed: 4,
	dx: 4,
	dy: -4,
};

// Create paddle props
const paddle = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	w: 80,
	h: 10,
	speed: 8,
	dx: 0,
};

// Create brick props
const brickInfo = {
	w: 70,
	h: 20,
	padding: 10,
	offsetX: 45,
	offsetY: 60,
	visible: true,
};

// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
	bricks[i] = [];
	for (let j = 0; j < brickColumnCount; j++) {
		const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
		const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
		bricks[i][j] = { x, y, ...brickInfo };
	}
}

/////////////////////////////////////////////
// Functions

// Draw ball on canvas
const drawBall = function () {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	ctx.fillStyle = "#0095dd";
	ctx.fill();
	ctx.closePath();
};

// Draw paddle on canvas
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
	ctx.fillStyle = "#0095dd";
	ctx.fill();
	ctx.closePath();
}

// Draw score oon canvas
const drawScore = function () {
	ctx.font = "20px Arial";
	ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
};

// Draw bricks on canvas
const drawBricks = function () {
	bricks.forEach(column => {
		column.forEach(brick => {
			ctx.beginPath();
			ctx.rect(brick.x, brick.y, brick.w, brick.h);
			ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
			ctx.fill();
			ctx.closePath();
		});
	});
};

// Move paddle on canvas
const movePaddle = function () {
	paddle.x += paddle.dx;

	// Wall detection
	if (paddle.x + paddle.w > canvas.width) {
		paddle.x = canvas.width - paddle.w;
	}

	if (paddle.x < 0) {
		paddle.x = 0;
	}
};

// Make all bricks appear
const showAllBricks = function () {
	bricks.forEach(column => {
		column.forEach(brick => (brick.visible = true));
	});
};

// Move ball on canvas
const moveBall = function () {
	ball.x += ball.dx;
	ball.y += ball.dy;

	// Wall collision (right/left)
	if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
		ball.dx *= -1; // ball.dx = ball.dx * -1
	}

	// Wall collision (top/bottom)
	if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
		ball.dy *= -1;
	}

	// Paddle collision
	if (
		ball.x - ball.size > paddle.x &&
		ball.x + ball.size < paddle.x + paddle.w &&
		ball.y + ball.size > paddle.y
	) {
		ball.dy = -ball.speed;
	}

	// Brick collision
	bricks.forEach(column => {
		column.forEach(brick => {
			if (brick.visible) {
				if (
					ball.x - ball.size > brick.x && // left brick side check
					ball.x + ball.size < brick.x + brick.w && // right brick side check
					ball.y + ball.size > brick.y && // top brick side check
					ball.y - ball.size < brick.y + brick.h // bottom brick side check
				) {
					ball.dy *= -1;
					brick.visible = false;

					increaseScore();
				}
			}
		});
	});

	// Hit bottom wall - Lose
	if (ball.y + ball.size > canvas.height) {
		showAllBricks();
		score = 0;
	}
};

// Increase score
const increaseScore = function () {
	score++;

	if (score % (brickRowCount * brickRowCount) === 0) {
		showAllBricks();
	}
};

// Draw everything
const draw = function () {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBall();
	drawPaddle();
	drawScore();
	drawBricks();
};

// Update canvas drawing and animation
const update = function () {
	movePaddle();
	moveBall();

	// Draw everything
	draw();

	requestAnimationFrame(update);
};
update();

// Keydown event
const keyDown = function (e) {
	if (e.key === "Right" || e.key === "ArrowRight") {
		paddle.dx = paddle.speed;
	} else if (e.key === "Left" || e.key === "ArrowLeft") {
		paddle.dx = -paddle.speed;
	}
};

// Keyup event
const keyUp = function (e) {
	if (
		e.key === "Right" ||
		e.key === "ArrowRight" ||
		e.key === "Left" ||
		e.key === "ArrowLeft"
	) {
		paddle.dx = 0;
	}
};

/////////////////////////////////////////////
// Event Listeners

// Keyboard event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Rules and close event handlers
rulesBtn.addEventListener("click", function () {
	rules.classList.add("show");
});
closeBtn.addEventListener("click", function () {
	rules.classList.remove("show");
});
