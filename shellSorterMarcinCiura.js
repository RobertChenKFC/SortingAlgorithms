/**
 * A function that sleeps for a given amount of time
 * @param {Number} t - The number of milliseconds to sleep
 */
function sleep(t) {
  const to = new Date().getTime() + t;
  while (new Date().getTime() <= to) {}
}

let counter = 0;
const maxCount = 5;
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
  // Shell sort (Marcin Ciura) starts here
  const gaps = [701, 301, 132, 57, 23, 10, 4, 1];
  for (const gap of gaps) {
    for (let i = gap; i < arr.length; ++i) {
      const t = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > t; j -= gap) {
        arr[j] = arr[j - gap];

        const mark = [];
        mark[j] = {r: 255, g: 0, b: 0};
        mark[j - gap] = {r: 255, g: 0, b: 0};
        passBack({arr, mark});
      }
      arr[j] = t;
    }
  }
  passBack({arr, mark: []}, true);
};
