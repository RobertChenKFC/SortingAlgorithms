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
  // Double selection sort starts here
  for (let i = 0; i <= (arr.length >> 1); ++i) {
    let maxj = 0;
    let minj = 0;
    for (let j = i; j < arr.length - i; ++j) {
      if (arr[j] > arr[maxj]) {
        maxj = j;
      }
      if (arr[j] < arr[minj]) {
        minj = j;
      }

      const mark = [];
      mark[j] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});
    }

    const t1 = arr[maxj];
    arr[maxj] = arr[arr.length - i - 1];
    arr[arr.length - i - 1] = t1;
    const t2 = arr[minj];
    arr[minj] = arr[i];
    arr[i] = t2;
  }
  passBack({arr, mark: []}, true);
};
