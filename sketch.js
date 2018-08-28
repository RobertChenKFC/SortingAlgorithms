let sorter;

/* exported setup */
/**
 * p5 setup function
 */
function setup() {
  createCanvas(800, 600).parent('canvas-holder');

  select('#sorter').changed(reset);
  select('#reset').mousePressed(reset);
  reset();
}

/* exported draw */
/**
 * p5 draw function
 */
function draw() {
  background(0);

  select('#sliderValue').html(select('#slider').value());

  sorter.sort(select('#slider').value());
  sorter.draw();
}

/**
 * Resets the array in the sorter to a shuffled state
 */
function reset() {
  switch (select('#sorter').value()) {
  case 'bubbleSort':
    sorter = new BubbleSorter(width, height);
    break;
  case 'selectionSort':
    sorter = new SelectionSorter(width, height);
    break;
  case 'insertionSort':
    sorter = new InsertionSorter(width, height);
    break;
  }
}
