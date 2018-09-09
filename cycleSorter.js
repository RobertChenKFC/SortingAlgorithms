/**
 * A function that sleeps for a given amount of time
 * @param {Number} t - The number of milliseconds to sleep
 */
function sleep(t) {
  const to = new Date().getTime() + t;
  while (new Date().getTime() <= to) {}
}

let counter = 0;
const maxCount = 300;
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
  // Cycle sort starts here
  for (let start = 0; start <= arr.length - 2; ++start) {
    let item = arr[start];
    let pos = start;
    for (let i = start + 1; i < arr.length; ++i) {
      if (arr[i] < item) {
        ++pos;

        const mark = [];
        mark[pos] = {r: 255, g: 0, b: 0};
        passBack({arr, mark});
      }
    }
    if (pos === start) {
      continue;
    }
    while (item === arr[pos]) {
      ++pos;

      const mark = [];
      mark[pos] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});
    }
    if (pos !== start) {
      const t = item;
      item = arr[pos];
      arr[pos] = t;
    }
    while (pos !== start) {
      pos = start;
      for (let i = start + 1; i < arr.length; ++i) {
        if (arr[i] < item) {
          ++pos;

          const mark = [];
          mark[pos] = {r: 255, g: 0, b: 0};
          passBack({arr, mark});
        }
      }
      while (item === arr[pos]) {
        ++pos;

        const mark = [];
        mark[pos] = {r: 255, g: 0, b: 0};
        passBack({arr, mark});
      }
      if (item !== arr[pos]) {
        const t = item;
        item = arr[pos];
        arr[pos] = t;
      }
    }
  }
  passBack({arr, mark: []}, true);
};
