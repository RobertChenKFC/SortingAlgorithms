/**
 * A function that sleeps for a given amount of time
 * @param {Number} t - The number of milliseconds to sleep
 */
function sleep(t) {
  const to = new Date().getTime() + t;
  while (new Date().getTime() <= to) {}
}

let counter = 0;
const maxCount = 10;
/**
 * A function that passes back data after counter has exceeded maxCount
 * @param {Object} data - The data to pass back
 * @param {Boolean} force - Whether data pass is forced
 */
function passBack(data, force = false) {
  if (++counter >= maxCount || force) {
    postMessage(data);
    sleep(10);
    counter = 0;
  }
}

onmessage = function(e) {
  const arr = e.data.arr;
  // Merge sort starts here
  /**
   * Applies merge sort to an array
   * @param {Number[]} arr - The array to sort
   * @param {Number} from - The start of the array
   * @param {Number} to - The end of the array
   */
  function mergeSort(arr, from, to) {
    if (from >= to) {
      return;
    }

    const mid = (from + to) >> 1;
    mergeSort(arr, from, mid);
    mergeSort(arr, mid + 1, to);

    const newArr = [];
    for (let i = from, j = mid + 1, k = from; k <= to; ++k) {
      if (j > to || (i <= mid && arr[i] < arr[j])) {
        newArr[k] = arr[i];
        ++i;

        const mark = [];
        mark[i - 1] = {r: 255, g: 0, b: 0};
        passBack({arr, mark});
      } else {
        newArr[k] = arr[j];
        ++j;

        const mark = [];
        mark[j - 1] = {r: 255, g: 0, b: 0};
        passBack({arr, mark});
      }
    }
    for (let i = from; i <= to; ++i) {
      arr[i] = newArr[i];
    }
  }
  mergeSort(arr, 0, arr.length - 1);
  passBack({arr, mark: []}, true);
};
