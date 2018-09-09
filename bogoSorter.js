/**
 * A function that sleeps for a given amount of time
 * @param {Number} t - The number of milliseconds to sleep
 */
function sleep(t) {
  const to = new Date().getTime() + t;
  while (new Date().getTime() <= to) {}
}

let counter = 0;
const maxCount = 100000;
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
  // Bogo sort starts here
  while (true) {
    let sorted = true;
    for (let i = 1; i < arr.length; ++i) {
      if (arr[i - 1] > arr[i]) {
        sorted = false;
        break;
      }
    }
    if (sorted) {
      break;
    }
    for (let i = 0; i < arr.length; ++i) {
      const j = Math.floor(Math.random() * arr.length);
      const t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;

      passBack({arr, mark: []});
    }
  }
  passBack({arr, mark: []}, true);
};
