/* exported BubbleSorter */
/**
 * A class that implements bubble sort
 */
class BubbleSorter extends Sorter {
  /**
   * Represents a BubbleSorter
   * @constructor
   * @param {Number} width - The width of the canvas
   * @param {Number} height - The height of the canvas
   */
  constructor(width, height) {
    super();

    this.n = width;
    this.height = height;
    this.i = 0;
    this.j = 0;

    this.arr = [];
    for (let i = 1; i <= this.n; ++i) {
      this.arr.push(i / this.n * this.height);
    }
    this.arr = shuffle(this.arr);
  }

  /**
   * Displays the array in canvas
   */
  draw() {
    for (let i = 0; i < this.n; ++i) {
      if (i === this.j) {
        stroke(255, 0, 0);
      } else {
        stroke(150);
      }
      line(i, this.height, i, this.height - this.arr[i]);
    }
  }

  /**
   * Sorts the array in a certain number of steps
   * @param {Number} steps - Number of steps to sort
   */
  sort(steps) {
    if (this.i === this.n) {
      return;
    }

    for (let step = 0; step < steps; ++step) {
      if (this.arr[this.j] > this.arr[this.j + 1]) {
        const t = this.arr[this.j];
        this.arr[this.j] = this.arr[this.j + 1];
        this.arr[this.j + 1] = t;
      }

      ++this.j;
      if (this.j > this.n - this.i) {
        this.j = 0;
        if (++this.i === this.n) {
          return;
        }
      }
    }
  }
}
