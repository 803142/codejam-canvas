class App {
	constructor() {
		this.activeMenuItem = "";
		this.mainfraim = new MainFrame();
	}

	render() {
		const frame = new MainFrame();

		const menu = document.body.querySelector('nav[class="header-nav_resize"]');

		const canvasToDraw = document.querySelector(
			'canvas[class="canvas__canvas-grid"]'
		);

		document.body.querySelector(".main__frame-list");
		canvasToDraw.addEventListener("mousedown", e => {
			frame.changeFrame(e, canvasToDraw);
		});
	}
}

function checkThisSize(size, address) {
	alert(address);
}

class MainFrame {
	constructor() {
		this.mainFrame = [];
		this.chosenColor = "1";
		this.changeFrame = (e, canvasToDraw, size = 4) => {
			const width = e.target.clientWidth / size;
			const height = e.target.clientHeight / size;
			const x = Math.floor(e.offsetX / width);
			const y = Math.floor(e.offsetY / height);
			this.draw(this.chosenColor, x, y, canvasToDraw, size);
			return [x, y];
		};
		this.render = canvasToDraw => {
			this.mainFrame.forEach((rowArray, i) => {
				rowArray.forEach((elementOfCanvas, j) => {
					this.draw(elementOfCanvas, i, j, canvasToDraw);
				});
			});
		};
		this.draw = (pointToDraw, x, y, canvasToDraw, size) => {
			const width = Math.floor(canvasToDraw.width / size);
			const height = Math.floor(canvasToDraw.height / size);
			const fromLeft = width * x;
			const fromTop = height * y;
			const ctx = canvasToDraw.getContext("2d");
			ctx.fillStyle = `${this.chosenColor}`;
			ctx.fillRect(fromLeft, fromTop, width, height);
		};
	}
}

const app = new App();

window.onload = () => {
	app.render();
};
