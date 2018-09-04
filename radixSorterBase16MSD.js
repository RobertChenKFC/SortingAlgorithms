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
  // Radix sort (base 16, MSD) starts here
  const max = arr.reduce((acc, cur) => acc > cur ? acc : cur);
  const digit = Math.floor(Math.floor(Math.log2(max)) / 4) * 4;
  /**
   * Applies radix sort (MSD) to an array
   * @param {Number} from - The start of the array
   * @param {Number} to - The end of the array
   * @param {Number} mask - The current digit mask
   * @param {Number} shift - The current digit shift
   */
  function radixSort(from, to, mask = 15 << digit, shift = digit) {
    if (from >= to || mask === 0) {
      return;
    }
    const buckets = [];
    for (let i = 0; i < 16; ++i) {
      buckets.push([]);
    }
    for (let i = from; i <= to; ++i) {
      buckets[(arr[i] & mask) >> shift].push(arr[i]);

      const mark = [];
      mark[i] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});
    }
    let idx = from;
    let froms = [];
    let tos = [];
    for (const bucket of buckets) {
      if (bucket.length !== 0) {
        froms.push(idx);
        for (const elem of bucket) {
          arr[idx++] = elem;
        }
        tos.push(idx - 1);
      }
    }
    for (let i = 0; i < froms.length; ++i) {
      radixSort(froms[i], tos[i], mask >> 4, shift - 4);
    }
  }
  radixSort(0, arr.length - 1);
  passBack({arr, mark: []}, true);
};
