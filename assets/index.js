class App {
	constructor() {
		this.activeMenuItem = undefined;
		this.canvasToDraw = document.querySelector(
			'canvas[class="canvas__canvas-grid"]'
		);
	}

	render() {
		const menu = document.body.querySelector('nav[class="header-nav_resize"]');

		const canvasToDraw = document.querySelector(
			'canvas[class="canvas__canvas-grid"]'
		);
	}
}

function checkThisSize(el, size, address) {
	switcher(el);
	app.activeMenuItem = el;
	const arr = (async () => {
		dataImage(address, size);
	})();
}

function checkThisSizeImage(el, address) {
	switcher(el);
	app.activeMenuItem = el;
	const ctx = app.canvasToDraw.getContext("2d");

	const image = new Image(256, 256);
	image.onload = drawImageActualSize;

	image.src = address;

	function drawImageActualSize() {
		app.canvasToDraw.width = this.naturalWidth;
		app.canvasToDraw.height = this.naturalHeight;
		ctx.drawImage(this, 0, 0);
		ctx.drawImage(this, 0, 0, this.width, this.height);
	}
}

async function dataImage(address, size) {
	let result = await fetch(address)
		.then(response => response.json())
		.catch(error => console.log("Request failed", error));
	result.forEach((row, rowI) => {
		row.forEach((el, colI) => {
			draw(rowI, colI, size, el);
		});
	});

	return result;
}

function switcher(el) {
	if (app.activeMenuItem && app.activeMenuItem != el) {
		app.activeMenuItem.classList.toggle("icon-blank");
		app.activeMenuItem.classList.toggle("icon-check");
	}
	el.classList.toggle("icon-blank");
	el.classList.toggle("icon-check");
}

const draw = (x, y, size, color) => {
	const width = Math.floor(app.canvasToDraw.width / size);
	const height = Math.floor(app.canvasToDraw.height / size);
	const fromLeft = width * x;
	const fromTop = height * y;
	const ctx = app.canvasToDraw.getContext("2d");
	if (color.length > 4) {
		ctx.fillStyle = `#${color}`;
	} else {
		const [a, b, c, d] = color;
		ctx.fillStyle = `rgba(${a},${b},${c},${255 / d})`;
	}

	ctx.fillRect(fromLeft, fromTop, width, height);
};

const app = new App();

window.onload = () => {
	app.render();
};
