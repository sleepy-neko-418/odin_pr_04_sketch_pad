(function () {
  let globalStates = {
    canvasRow: 48,
    canvasCol: 64,
    isPressing: false,
    drawingMode: 'pencil',
  };

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
        cell.setAttribute("class", "canvas-cell");
        cell.setAttribute("id", `canvas-cell-${row}-${col}`);
        cell.addEventListener("mouseover", changeCellColor);
        cell.addEventListener("click", fillCellsColor);

        rowDiv.appendChild(cell);
      }

      canvas.appendChild(rowDiv);
    }

  }

  function initTools() {
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

  function changeGridSize() {
    let gridSizeInput = document.querySelector("#grid-size-input");
    let [canvasRow, canvasCol] = gridSizeInput.value.split("-").map((s) => parseInt(s));
    globalStates = {...globalStates, canvasRow, canvasCol};
    renderCanvas();
  }

  function changeCellColor(e) {
    let target = e.target;
    if (globalStates.isPressing) {
      if (globalStates.drawingMode === "pencil") {
        target.style.background = globalStates.penColor;
      } else if (globalStates.drawingMode === "erase") {
        target.style.background = "white";
      }
    }
  }

  function fillCellsColor(e) {
    let target = e.target;
  }

  function changePencilMode() {
    globalStates.drawingMode = 'pencil';
    let pencilColorInput = document.querySelector("#pencil-color-input");
    globalStates.penColor = pencilColorInput.value;
    let canvas = document.querySelector("div.canvas"); 
    canvas.style.cursor = "default";
  }

  function changeEraseMode() {
    globalStates.drawingMode = 'erase';
    let canvas = document.querySelector("div.canvas"); 
    canvas.style.cursor = "not-allowed";
  }

  function changeFillMode() {
    globalStates.drawingMode = 'fill';
    let canvas = document.querySelector("div.canvas"); 
    canvas.style.cursor = "cell";
  }

  function clearCanvas() {
    let cells = document.querySelectorAll(".canvas-cell");
    cells.forEach((e) => e.style.background = "white");
  }
  initTools();
})();
