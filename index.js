// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

var button = document.getElementById('chessBoard');
button.addEventListener('click', bishopMove);

/* onlaod time generating the chess board */

var createBoard = function () {
	var chessBoard = document.getElementById("chessBoard");
	var xAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
	var yAxis = [1, 2, 3, 4, 5, 6, 7, 8];
	var currentTile = {};
	var count = 0;
	for (var i = 0; i < xAxis.length; i++) {
		for (var j = 0; j < yAxis.length; j++) {
			var newCell = document.createElement("div");
			if (count % 8 == 0) {
				newCell.className = "tile smoothfade";
				newCell.style.clear = "left";
			} else {
				newCell.className = "tile smoothfade";
				// chessBoard.appendChild(newCell);
			}
			chessBoard.appendChild(newCell);
			document.getElementsByClassName("tile")[count].setAttribute("id", xAxis[i] + yAxis[j]);
			if ((i % 2 == 0 && j % 2 != 0) || (i % 2 != 0 && j % 2 == 0)) {
				document.getElementsByClassName("tile")[count].classList.add("black");
			} else {
				document.getElementsByClassName("tile")[count].classList.add("white");
			}
			count++;
		}
	}
}

/* it will identify the xAxis and yAxis value */

function bishopMove(e) {
	e = e || window.event;
	e = e.target || e.srcElement;
	var getValue = e.getAttribute("id");
	bishopDirection(getValue);
}

/* highlight background color remove */

function removClass() {
	var tile = document.getElementsByClassName("tile");
	for (var i = 0; i < tile.length; i++) {
		tile[i].classList.remove("legal");
	}
}

/* bishop direction possibility */

function bishopDirection(bishop, e) {
	var chessX = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
	var boardLength = 8;
	var bishopX = chessX.indexOf(bishop[0]);
	var bishopY = parseInt(bishop[1]);
	var maxIterations = Math.max(8 - bishopX, 8 - bishopY, bishopX - 1, bishopY - 1);
	var bishopLocations = [];
	var bishopTranslatedLocations = [];

	/* console.log('Bishop X-Location: ', bishopX);
	console.log('Bishop Y-Location: ', bishopY);
	console.log('Max Interations: ', maxIterations); */

	for (var i = 0; i <= maxIterations; i++) {

		if (bishopX + i <= boardLength) {

			if (bishopY + i <= boardLength) {
				bishopLocations.push([bishopX + i, bishopY + i]);
			}

			if (bishopY - i >= 1) {
				bishopLocations.push([bishopX + i, bishopY - i]);
			}

		}

		if (bishopX - i >= 1) {

			if ((bishopY - 1) - i >= 1) {
				bishopLocations.push([(bishopX - 1) - i, (bishopY - 1) - i]);
			}

			if (bishopY + i <= boardLength) {
				bishopLocations.push([bishopX - i, bishopY + i]);
			}

		}

	}
	bishopLocations.sort();
	for (var location = 0; location < bishopLocations.length; location++) {
		var ID = chessX[bishopLocations[location][0]] + (bishopLocations[location][1]);
		bishopTranslatedLocations.push(ID);
	}
	removClass();
	removeDuplicate(bishopTranslatedLocations);
}

/* removing duplicate */

function removeDuplicate(bishop) {
	var current = null;
	var cnt = 0;
	var bi = []
	bi = bishop.filter(Boolean);
	//   console.log(bi);

	for (var i = 0; i <= bi.length - 1; i++) {
		if (bi[i] != current) {
			if (cnt > 2) {
				var temp = current.split('');
				var fristFourRow = ["A", "B", "C", "D", "E", "F", "G", "H"];;
				var x = fristFourRow.indexOf(temp[0]);
				var y = parseInt(temp[1]);
				if (x >= 0 && y <= 7) {
					var sum = x + y;
					if (sum <= 8) {
						// console.log(fristFourRow[0] + sum);
						var tempID = fristFourRow[0] + sum;
						document.getElementById(tempID).classList.add("legal");
					}

				}
				// console.log(current + ' comes --> ' + cnt + ' firstimes<br>');			
			}
			current = bi[i];
			cnt = 1;
		} else {
			cnt++;
		}
		//   console.log(bi[i])
		document.getElementById(bi[i]).classList.add("legal");
	}
}

/* on load to call this function and generating the chessBoard */

createBoard();