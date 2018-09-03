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
  const arr = e.data.arr;
  // Heap sort starts here
  let from = 0;
  let to = arr.length - 1;
  /**
   * A function that turns a heap into a max heap
   * @param {Number} root - The root node to start heapify
   */
  function siftDown(root) {
    const left = (root << 1) + 1;
    const right = left + 1;
    let largest = root;
    if (left <= to && arr[largest] < arr[left]) {
      largest = left;
    }
    if (right <= to && arr[largest] < arr[right]) {
      largest = right;
    }
    if (largest !== root) {
      const t = arr[largest];
      arr[largest] = arr[root];
      arr[root] = t;
      siftDown(largest);

      const mark = [];
      mark[largest] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});
    }
  }
  for (let i = arr.length >> 1; i >= 1; --i) {
    siftDown(i);
  }
  while (from < to) {
    const t = arr[from];
    arr[from] = arr[to];
    arr[to] = t;

    --to;
    siftDown(from);
  }
  passBack({arr, mark: []}, true);
};
