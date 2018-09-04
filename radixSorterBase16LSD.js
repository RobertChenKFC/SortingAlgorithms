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
  let arr = e.data.arr;
  // Radix sort (base 16, LSD) starts here
  let mask = 15;
  for (let i = 0; i < 3; ++i, mask <<= 4) {
    const buckets = [];
    for (let j = 0; j < 16; ++j) {
      buckets.push([]);
    }

    for (let j = 0; j < arr.length; ++j) {
      const bucket = buckets[(arr[j] & mask) >> (i << 2)];
      bucket.push(arr[j]);

      const mark = [];
      mark[j] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});
    }

    arr = [];
    for (const bucket of buckets) {
      for (const elem of bucket) {
        arr.push(elem);
      }
    }
  }
  passBack({arr, mark: []}, true);
};
