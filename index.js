(function () {
  let globalStates = {
    canvasRow: 16,
    canvasCol: 20,
    canvasWidth: 800,
    canvasHeight: 640,
  };

  function renderCanvas() {
    let canvas = document.querySelector("body>div.container");
    let cellSize = globalStates.canvasHeight / globalStates.canvasRow;

    // Clear canvas states
    canvas.replaceChildren([]);

    // Generate cells

  }


})();