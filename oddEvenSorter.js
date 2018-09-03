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
  // Odd-Even sort starts here
  let isSorted;
  do {
    isSorted = true;
    for (let i = 1; i < arr.length - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        isSorted = false;
        const t = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = t;

        const mark = [];
        mark[i] = {r: 255, g: 0, b: 0};
        passBack({arr, mark});
      }
    }
    for (let i = 0; i < arr.length - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        isSorted = false;
        const t = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = t;

        const mark = [];
        mark[i] = {r: 255, g: 0, b: 0};
        passBack({arr, mark});
      }
    }
  } while (!isSorted);
  passBack({arr, mark: []}, true);
};
