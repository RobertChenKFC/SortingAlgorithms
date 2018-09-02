let worker;
let drawArr;
let drawMark;

/**
 * A function that generates a shuffled array
 * @return {Number[]} - a shuffled array
 */
function genArr() {
  const arr = [];
  for (let i = 0; i < width; ++i) {
    arr.push(i / width * height);
  }
  return shuffle(arr);
}

/**
 * A function that draws when the worker updates
 * @param {Number[]} e - The data posted from the worker
 */
function update(e) {
  drawArr = e.data.arr;
  drawMark = e.data.mark;
}

/**
 * Creates a new worker according to the combobox value
 */
function newWorker() {
  background(0);
  if (worker) {
    worker.terminate();
  }
  switch (select('#sorter').value()) {
  case 'bubbleSort':
    worker = new Worker('bubbleSorter.js');
    break;
  case 'selectionSort':
    worker = new Worker('selectionSorter.js');
    break;
  case 'insertionSort':
    worker = new Worker('insertionSorter.js');
    break;
  case 'mergeSort':
    worker = new Worker('mergeSorter.js');
    break;
  case 'quickSort':
    worker = new Worker('quickSorter.js');
    break;
  }
  worker.onmessage = update;
  worker.postMessage({arr: genArr()});
}

/* exported setup */
/**
 * p5 setup function
 */
function setup() {
  createCanvas(800, 600).parent('canvas-holder');

  select('#sorter').changed(() => {
    newWorker();
  });

  select('#reset').mousePressed(() => {
    newWorker();
  });

  newWorker();
}

/* exported draw */
/**
 * p5 draw function
 */
function draw() {
  background(0);
  strokeWeight(1);

  if (drawArr) {
    for (let i = 0; i < width; ++i) {
      const col = drawMark[i];
      if (col) {
        stroke(col.r, col.g, col.b);
      } else {
        stroke(150);
      }
      line(i + 1, height, i + 1, height - drawArr[i]);
    }
  }
}
