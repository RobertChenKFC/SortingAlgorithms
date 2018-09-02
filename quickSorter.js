/**
 * A function that sleeps for a given amount of time
 * @param {Number} t - The number of milliseconds to sleep
 */
function sleep(t) {
  const to = new Date().getTime() + t;
  while (new Date().getTime() <= to) {}
}

let counter = 0;
const maxCount = 2;
/**
 * A function that passes back data after counter has exceeded maxCount
 * @param {Object} data - The data to pass back
 * @param {Boolean} force - Whether data pass is forced
 */
function passBack(data, force) {
  if (++counter >= maxCount || force) {
    postMessage(data);
    sleep(10);
    counter = 0;
  }
}

onmessage = function(e) {
  const arr = e.data.arr;
  // Quick sort starts here
  /**
   * Applies quick sort to an array
   * @param {Number[]} arr - The array to sort
   * @param {Number} from - The start of the array
   * @param {Number} to - The end of the array
   */
  function quickSort(arr, from, to) {
    if (from >= to) {
      return;
    }

    let i = from;
    let j = to + 1;
    let p = arr[from];
    while (i < j) {
      while (i < to && arr[++i] < p) {}
      while (j > from && arr[--j] > p) {}
      if (i < j) {
        const t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;

        const mark = [];
        mark[p] = {r: 0, g: 255, b: 0};
        mark[i] = {r: 255, g: 0, b: 0};
        mark[j] = {r: 255, g: 0, b: 0};
        passBack({arr, mark});
      }
    }
    const t = arr[from];
    arr[from] = arr[j];
    arr[j] = t;

    quickSort(arr, from, j - 1);
    quickSort(arr, j + 1, to);
  }
  quickSort(arr, 0, arr.length - 1);
  passBack({arr, mark: []}, true);
};
