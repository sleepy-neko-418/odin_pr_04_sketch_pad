(function () {
  let globalStates = {
    canvasRow: 48,
    canvasCol: 64,
    isDrawing: false,
  };

  function renderCanvas() {
    let body = document.querySelector("body");
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
        cell.addEventListener("mouseover", changeColor);

        rowDiv.appendChild(cell);
      }

      canvas.appendChild(rowDiv);
    }

    body.addEventListener("mousedown", () => globalStates.isDrawing = true);
    body.addEventListener("mouseup", () => globalStates.isDrawing = false);
  }

  function initTools() {
    let gridSizeInput = document.querySelector("#grid-size-input");
    gridSizeInput.addEventListener('change', changeGridSize)

    let pencilColorInput = document.querySelector("#pencil-color-input");
    pencilColorInput.addEventListener('change', () => globalStates.penColor = pencilColorInput.value);

    let pencilButton = document.querySelector("#pencil-button");
    pencilButton.addEventListener('click', () => globalStates.penColor = pencilColorInput.value);

    let eraserButton = document.querySelector("#eraser-button");
    eraserButton.addEventListener('click', () => globalStates.penColor = "white");

    let clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener('click', clearCanvas);
  } 

  function changeGridSize() {
    let gridSizeInput = document.querySelector("#grid-size-input");
    let [canvasRow, canvasCol] = gridSizeInput.value.split("-").map((s) => parseInt(s));
    globalStates = {...globalStates, canvasRow, canvasCol};
    renderCanvas();
  }

  function changeColor(e) {
    let target = e.target;
    if (globalStates.isDrawing) {
      target.style.background = globalStates.penColor;
    }
  }

  function clearCanvas() {
    let cells = document.querySelectorAll(".canvas-cell");
    cells.forEach((e) => e.style.background = "white");
  }

  initTools();
  renderCanvas();
})();
