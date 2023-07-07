const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const timeEl = document.getElementById('time');
const board = document.getElementById('board');
const prevScoreEl = document.getElementById('prevScore');
const prevScoreKey = 'score';
const colors = [
	'#e74c3c',
	'#8e44ad',
	'#3498db',
	'#e67e22',
	'#2ecc71',
	'#f1c40f',
	'#c0392b',
	'#9b59b6',
	'#1abc9c',
	'#f39c12',
	'#27ae60',
	'#d35400',
	'#2980b9',
	'#d35400',
	'#16a085',
];
let prevScore = localStorage.getItem(prevScoreKey) || 0;
let time = 0;
let score = 0;

prevScoreEl.textContent = prevScore;

startBtn.addEventListener('click', event => {
	event.preventDefault();
	screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRandomCircle();
	}
});

function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	timeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`;
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		timeEl.textContent = `00:${current.toString().padStart(2, '0')}`;
	}
}

function finishGame() {
	board.innerHTML = `
	<div>
	<h1>Your score: <span class='primary'>${score}</span></h1>
	<a href='/' class='back'>Try again</a>
	</div >`;
	if (prevScore < score) {
		localStorage.setItem(prevScoreKey, score);
	}
	timeEl.parentNode.classList.add('hide');
}

function createRandomCircle() {
	const circle = document.createElement('div');
	const size =
		getWindowWidth() < 600 ? getRandomNumber(17, 40) : getRandomNumber(10, 40);
	const { width, height } = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);
	let color = getRandomColor();

	circle.style.backgroundColor = color;
	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;

	board.append(circle);
}

function getWindowWidth() {
	return (
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth
	);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}
