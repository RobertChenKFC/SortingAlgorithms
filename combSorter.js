/**
 * A function that sleeps for a given amount of time
 * @param {Number} t - The number of milliseconds to sleep
 */
function sleep(t) {
  const to = new Date().getTime() + t;
  while (new Date().getTime() <= to) {}
}

let counter = 0;
const maxCount = 15;
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
  // Comb sort starts here
  let sorted = false;
  let gap = arr.length;
  const shrink = 1 / 1.3;
  while (!sorted) {
    gap = Math.floor(gap * shrink);
    if (gap > 1) {
      sorted = false;
    } else {
      gap = 1;
      sorted = true;
    }

    for (let i = gap; i < arr.length; ++i) {
      if (arr[i - gap] > arr[i]) {
        const t = arr[i - gap];
        arr[i - gap] = arr[i];
        arr[i] = t;
        sorted = false;
      }

      const mark = [];
      mark[i] = {r: 255, g: 0, b: 0};
      mark[i - gap] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});
    }
  }
  passBack({arr, mark: []}, true);
};
