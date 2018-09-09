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
  // Tree sort starts here
  /**
   * Class representing a node of a tree
   */
  class Node {
    /**
     * Create a node
     * @param {Number} idx - The index of the current node
     * @param {Number} val - The value of the current node
     */
    constructor(idx, val) {
      this.idx = idx;
      this.val = val;
      this.left = this.right = undefined;
    }
    /**
     * Inserts a number with current node as the root of the tree
     * @param {Node} node - Node to insert
     */
    insert(node) {
      if (node.val < this.val) {
        if (this.left) {
          this.left.insert(node);
        } else {
          this.left = node;
        }
      } else {
        if (this.right) {
          this.right.insert(node);
        } else {
          this.right = node;
        }
      }
    }
    /**
     * Traverses the tree with breadth-first search
     * @return {Number[]} - The traversed elements in order
     */
    bfs() {
      const ret = [];
      const visited = [];
      const queue = [];
      queue.push(this);
      while (queue.length !== 0) {
        const node = queue[0];
        if (node && !visited[node.idx]) {
          visited[node.idx] = true;
          queue.shift();
          ret.push(node.val);
          if (node.left) {
            queue.push(node.left);
          }
          if (node.right) {
            queue.push(node.right);
          }
        }
      }
      return ret;
    }
    /**
     * Traverses the tree with depth-first search
     * @return {Number[]} - The traversed elements in order
     */
    dfs() {
      let ret = [];
      if (this.left) {
        ret = ret.concat(this.left.dfs());
      }
      ret.push(this.val);
      if (this.right) {
        ret = ret.concat(this.right.dfs());
      }

      const mark = [];
      mark[this.idx] = {r: 255, g: 0, b: 0};
      passBack({arr, mark});

      return ret;
    }
  }
  const node = new Node(0, arr[0]);
  for (let i = 1; i < arr.length; ++i) {
    node.insert(new Node(i, arr[i]));

    arr = node.bfs().concat(arr.slice(i + 1, arr.length));
    const mark = [];
    mark[i] = {r: 255, g: 0, b: 0};
    passBack({arr, mark});
  }
  arr = node.dfs();
  passBack({arr, mark: []}, true);
};
