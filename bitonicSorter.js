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
function passBack(data, force) {
  if (++counter >= maxCount || force) {
    postMessage(data);
    sleep(10);
    counter = 0;
  }
}

onmessage = function(e) {
  const arr = e.data.arr;
  // Bitonic sort starts here
  /**
   * Applies bitonic sort to an array
   * @param {Number} from - The start of the array
   * @param {Number} to - The end of the array
   * @param {Boolean} ascend - Whether to sort in ascending order or not
   */
  function bitonicSort(from, to, ascend) {
    if (from >= to) {
      return;
    }
    const m = (from + to) >> 1;
    bitonicSort(from, m, true);
    bitonicSort(m + 1, to, false);
    bitonicMerge(from, to, ascend);
  }
  /**
   * Applies bitonic sort to an array in bitonic sequence
   * @param {Number} from - The start of the array
   * @param {Number} to - The end of the array
   * @param {Boolean} ascend - Whether to sort in ascending order or not
   */
  function bitonicMerge(from, to, ascend) {
    if (from >= to) {
      return;
    }
    const dist = (to - from + 1) >> 1;
    for (let i = from; i < from + dist; ++i) {
      if (arr[i] <= arr[i + dist] !== ascend) {
        const t = arr[i];
        arr[i] = arr[i + dist];
        arr[i + dist] = t;

        const mark = [];
        mark[i] = {r: 255, g: 0, b: 0};
        mark[i + dist] = {r: 255, g: 0, b: 0};
        passBack({arr, mark});
      }
    }
    const m = (from + to) >> 1;
    bitonicMerge(from, m, ascend);
    bitonicMerge(m + 1, to, ascend);
  }
  bitonicSort(0, arr.length - 1, true);
  passBack({arr, mark: []}, true);
};
