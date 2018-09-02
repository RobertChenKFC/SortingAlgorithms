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
function passBack(data, force = false) {
  if (++counter >= maxCount || force) {
    postMessage(data);
    sleep(10);
    counter = 0;
  }
}

onmessage = function(e) {
  const arr = e.data.arr;
  // Selection sort starts here
  for (let i = 0; i < arr.length; ++i) {
    let maxj = 0;
    for (let j = 0; j < arr.length - i; ++j) {
      if (arr[j] > arr[maxj]) {
        maxj = j;
      }

      const mark = [];
      mark[j] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});
    }

    const t = arr[maxj];
    arr[maxj] = arr[arr.length - i - 1];
    arr[arr.length - i - 1] = t;
  }
  passBack({arr, mark: []}, true);
};
