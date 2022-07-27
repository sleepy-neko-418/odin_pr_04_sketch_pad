(function () {
  let globalStates = {
    canvasRow: 48,
    canvasCol: 64,
    isPressing: false,
    drawingMode: "pencil",
    erasedColor: "white",
  };

  function initPage() {
    let gridSizeInput = document.querySelector("#grid-size-input");
    gridSizeInput.addEventListener('change', changeGridSize)

    let pencilColorInput = document.querySelector("#pencil-color-input");
    globalStates.penColor = pencilColorInput.value
    pencilColorInput.addEventListener('change', () => globalStates.penColor = pencilColorInput.value);

    let pencilButton = document.querySelector("#pencil-button");
    pencilButton.addEventListener('click', changePencilMode);

    let eraserButton = document.querySelector("#eraser-button");
    eraserButton.addEventListener('click', changeEraseMode);

    let fillButton = document.querySelector("#fill-button");
    fillButton.addEventListener('click', changeFillMode)

    let clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener('click', clearCanvas);

    let body = document.querySelector("body");
    body.addEventListener("mousedown", () => globalStates.isPressing = true);
    body.addEventListener("mouseup", () => globalStates.isPressing = false);

    changeGridSize();
    changePencilMode();
  }

  function renderCanvas() {
    let canvas = document.querySelector("div.canvas");

    // Clear canvas states
    canvas.replaceChildren([]);

    // Generate cells
    for (let row = 0; row < globalStates.canvasRow; row += 1) {
      let rowDiv = document.createElement("div");
      rowDiv.setAttribute("class", "canvas-row");
      rowDiv.setAttribute("id", `canvas-row-${row}`);

      for (let col = 0; col < globalStates.canvasCol; col += 1) {
        let cell = document.createElement("div");
        cell.style.backgroundColor = globalStates.erasedColor;
        cell.setAttribute("class", "canvas-cell");
        cell.setAttribute("id", `canvas-cell-${row}-${col}`);
        cell.addEventListener("mouseover", changeCellColor);
        cell.addEventListener("click", fillCellsColor);

        rowDiv.appendChild(cell);
      }

      canvas.appendChild(rowDiv);
    }

  }

  function changeGridSize() {
    let gridSizeInput = document.querySelector("#grid-size-input");
    let [canvasRow, canvasCol] = gridSizeInput.value.split("-").map((s) => parseInt(s));
    globalStates = { ...globalStates, canvasRow, canvasCol };
    renderCanvas();
  }

  function changePencilMode() {
    globalStates.drawingMode = "pencil";
    let pencilColorInput = document.querySelector("#pencil-color-input");
    globalStates.penColor = pencilColorInput.value;
    let canvas = document.querySelector("div.canvas");
    canvas.style.cursor = "default";
  }

  function changeEraseMode() {
    globalStates.drawingMode = "erase";
    let canvas = document.querySelector("div.canvas");
    canvas.style.cursor = "not-allowed";
  }

  function changeFillMode() {
    globalStates.drawingMode = "fill";
    let canvas = document.querySelector("div.canvas");
    canvas.style.cursor = "cell";
  }

  function changeCellColor(e) {
    let target = e.target;
    if (globalStates.isPressing) {
      if (globalStates.drawingMode === "pencil") {
        target.style.backgroundColor = globalStates.penColor;
      } else if (globalStates.drawingMode === "erase") {
        target.style.backgroundColor = globalStates.erasedColor;
      }
    }
  }

  function fillCellsColor(e) {
    if (globalStates.drawingMode === "fill") {
      let target = e.target;
      let originalColor = target.style.backgroundColor;

      let pencilColorInput = document.querySelector("#pencil-color-input");
      let newColor = pencilColorInput.value;

      fillColorWithOrigin(target, originalColor, newColor);
    }
  }

  function fillColorWithOrigin(target, originalColor, newColor) {
    let visited = new Set()
    let toVisit = [target]

    while (toVisit.length > 0) {
      let currentCell = toVisit.shift();
      if (!visited.has(currentCell)) {
        visited.add(currentCell);

        if (currentCell.style.backgroundColor === originalColor || currentCell.style.backgroundColor == globalStates.erasedColor) {
          currentCell.style.backgroundColor = newColor;
          toVisit = toVisit.concat(validNeighbors(currentCell));
        }
      }
    }

    function validNeighbors(currentCell) {
      let result = [];
      let [_1, _2, row, col] = currentCell.getAttribute("id").split("-").map((e) => parseInt(e));

      // Same col, previous row
      if (row - 1 >= 0 && !visited.has([row - 1, col])) {
        result.push(document.querySelector(`#canvas-cell-${row - 1}-${col}`));
      }

      // Same col, next row
      if (row + 1 < globalStates.canvasRow && !visited.has([row + 1, col])) {
        result.push(document.querySelector(`#canvas-cell-${row + 1}-${col}`));
      }

      // Same row, previous col
      if (col - 1 >= 0 && !visited.has([row, col - 1])) {
        result.push(document.querySelector(`#canvas-cell-${row}-${col - 1}`));
      }

      // Same row, next col
      if (col + 1 < globalStates.canvasCol && !visited.has([row, col + 1])) {
        result.push(document.querySelector(`#canvas-cell-${row}-${col + 1}`));
      }

      return result;
    }
  }

  function clearCanvas() {
    let cells = document.querySelectorAll(".canvas-cell");
    cells.forEach((e) => e.style.backgroundColor = globalStates.erasedColor);
  }

  initPage();
})();
