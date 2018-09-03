/**
 * A function that sleeps for a given amount of time
 * @param {Number} t - The number of milliseconds to sleep
 */
function sleep(t) {
  const to = new Date().getTime() + t;
  while (new Date().getTime() <= to) {}
}

let counter = 0;
const maxCount = 500;
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
  // Cocktail shaker sort starts here
  for (let from = 0, to = arr.length - 1; from < to;) {
    for (let j = from; j < to; ++j) {
      if (arr[j] > arr[j + 1]) {
        const t = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = t;
      }

      const mark = [];
      mark[j] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});
    }
    --to;
    if (from >= to) {
      break;
    }
    for (let j = to; j > from; --j) {
      if (arr[j] < arr[j - 1]) {
        const t = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = t;
      }

      const mark = [];
      mark[j] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});
    }
    ++from;
  }
  passBack({arr, mark: []}, true);
};
