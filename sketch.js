let worker;
let drawArr;
let drawMark;

/**
 * A function that generates a random array
 * @return {Number[]} - a random array
 */
function randArr() {
  const arr = [];
  for (let i = 0; i < width; ++i) {
    arr.push(floor(i / width * height));
  }
  return shuffle(arr);
}

/**
 * A function that generates an array with only 4 unique values
 * @return {Number[]} - a few unique array
 */
function fewUniqueArr() {
  const arr = [];
  const sectionWidth = floor(width / 4);
  const sectionHeight = floor(height / 4);
  for (let i = 0; i < width; ++i) {
    arr.push((floor(i / sectionWidth) + 1) * sectionHeight);
  }
  return shuffle(arr);
}

/**
 * A function that generates an array with one element in wrong position
 * @return {Number[]} - an almost sorted array
 */
function almostSortedArr() {
  const arr = [];
  for (let i = 0; i < width; ++i) {
    arr.push(floor(i / width * height));
  }
  const t = arr[floor(width / 3)];
  arr[floor(width / 3)] = arr[width - 1];
  arr[width - 1] = t;
  return arr;
}

/**
 * A function that generates a reverse ordered array
 * @return {Number[]} - a reverse ordered array
 */
function reversedArr() {
  const arr = [];
  for (let i = 0; i < width; ++i) {
    arr.push(height - floor(i / width * height));
  }
  return arr;
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
  const file = select('#sorter').value().replace('Sort', 'Sorter') + '.js';
  worker = new Worker(file);
  let arr;
  switch (select('#arrType').value()) {
  case 'randArr':
    arr = randArr();
    break;
  case 'fewUniqueArr':
    arr = fewUniqueArr();
    break;
  case 'almostSortedArr':
    arr = almostSortedArr();
    break;
  case 'reversedArr':
    arr = reversedArr();
    break;
  }
  worker.onmessage = update;
  worker.postMessage({arr});
}

/* exported setup */
/**
 * p5 setup function
 */
function setup() {
  createCanvas(1024, 576).parent('canvas-holder');

  select('#sorter').changed(() => {
    newWorker();
  });

  select('#arrType').changed(() => {
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
