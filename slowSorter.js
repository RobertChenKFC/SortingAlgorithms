/**
 * A function that sleeps for a given amount of time
 * @param {Number} t - The number of milliseconds to sleep
 */
function sleep(t) {
  const to = new Date().getTime() + t;
  while (new Date().getTime() <= to) {}
}

let counter = 0;
const maxCount = 25000;
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
  // Slow sort starts here
  /**
   * Applies slow sort to an array
   * @param {Number} from - The start of the array
   * @param {Number} to - The end of the array
   */
  function slowSort(from, to) {
    if (from >= to) {
      return;
    }
    const m = (from + to) >> 1;
    slowSort(from, m);
    slowSort(m + 1, to);
    if (arr[m] > arr[to]) {
      const t = arr[m];
      arr[m] = arr[to];
      arr[to] = t;
    }

    const mark = [];
    mark[m] = {r: 255, g: 0, b: 0};
    mark[to] = {r: 255, g: 0, b: 0};
    passBack({arr, mark});

    slowSort(from, to - 1);
  }
  slowSort(0, arr.length - 1);
  passBack({arr, mark: []}, true);
};
