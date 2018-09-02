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
  // Insertion sort starts here
  for (let i = 0; i < arr.length; ++i) {
    let j;
    for (j = 0; j < i; ++j) {
      if (arr[j] > arr[i]) {
        break;
      }

      const mark = [];
      mark[j] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});
    }

    for (let k = i; k - 1 >= j; --k) {
      const t = arr[k];
      arr[k] = arr[k - 1];
      arr[k - 1] = t;

      const mark = [];
      mark[k] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});
    }
  }
  passBack({arr, mark: []}, true);
};
