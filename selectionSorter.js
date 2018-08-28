/* exported SelectionSorter */
/**
 * An implementation of selection sort
 */
class SelectionSorter extends Sorter {
  /**
   * Represents a SelectionSorter
   * @constructor
   * @param {Number} width - The width of the canvas
   * @param {Number} height - The height of the canvas
   */
  constructor(width, height) {
    super();

    this.n = width;
    this.height = height;
    this.i = this.n - 1;
    this.j = 0;
    this.maxj = 0;

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
    if (this.i === -1) {
      return;
    }

    for (let step = 0; step < steps; ++step) {
      if (this.arr[this.maxj] < this.arr[this.j]) {
        this.maxj = this.j;
      }

      ++this.j;
      if (this.j >= this.i) {
        const t = this.arr[this.maxj];
        this.arr[this.maxj] = this.arr[this.i];
        this.arr[this.i] = t;

        this.j = this.maxj = 0;
        if (--this.i === -1) {
          return;
        }
      }
    }
  }
}
