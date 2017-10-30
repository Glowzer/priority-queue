const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.amount = 0;
  }

  push(data, priority) {
    var node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  pop() {
    if (!this.isEmpty()) {
      let detach = this.detachRoot();
      this.restoreRootFromLastInsertedNode(detach);
      this.shiftNodeDown(this.root);
      this.amount--;
      return detach.data;
    }
  }

  detachRoot() {
    if (this.root === null)
      return;
    let node = this.root;
    this.root = null;
    if (this.parentNodes[0] === node)
      this.parentNodes.shift();
    return node;
  }

  restoreRootFromLastInsertedNode(detached) {
    if (typeof(detached.data) === 'undefined')
      return;
    if (this.parentNodes.length > 0) {
      this.root = this.parentNodes.pop();
      if (this.root.parent != null && this.root.parent !== detached && this.root.parent.right != null && this.root.parent.left != null)
        this.parentNodes.unshift(this.root.parent);
      this.root.remove();
      this.root.appendChild(detached.left)
      this.root.appendChild(detached.right)
      if (this.root.left == null || this.root.right == null)
        this.parentNodes.unshift(this.root);
    } else
      this.root = null;
  }

  size() {
    return this.amount;
  }

  isEmpty() {
    return this.root === null;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.amount = 0;
  }

  insertNode(node) {
    if (this.root == null) {
      this.root = node;
      this.parentNodes.push(node);
    } else {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
      if (this.parentNodes[0].left != null && this.parentNodes[0].right != null) {
        this.parentNodes.shift();
      }
    }
    this.amount++;
  }

  shiftNodeUp(node) {
    if (node.parent !== null && node.parent.priority < node.priority) {
      var index_of_node = -1,
        index_of_parent = -1;
      for (let i = 0; i < this.parentNodes.length; i++) {
        if (this.parentNodes[i] == node)
          index_of_node = i;
        else if (this.parentNodes[i] == node.parent)
          index_of_parent = i;
      }

      if (index_of_parent != -1) {
        this.parentNodes[index_of_parent] = node;
      }
      if (index_of_node != -1) {
        this.parentNodes[index_of_node] = node.parent;
      }
      node.swapWithParent();
      if (node.parent === null)
        this.root = node;
      this.shiftNodeUp(node);
    }
  }

  shiftNodeDown(node) {
    if (node == null)
      return;
    if (node.left != null) {
      if (node.right != null) {
        if (node.left.priority > node.right.priority && node.left.priority > node.priority) {
          var index_of_node = -1,
            index_of_son = -1;
          for (let i = 0; i < this.parentNodes.length; i++) {
            if (this.parentNodes[i] == node)
              index_of_node = i;
            else if (this.parentNodes[i] == node.left)
              index_of_son = i;
          }

          if (index_of_son != -1) {
            this.parentNodes[index_of_son] = node;
          }
          if (index_of_node != -1) {
            this.parentNodes[index_of_node] = node.left;
          }
          if (node == this.root)
            this.root = node.left;

          node.left.swapWithParent();
          this.shiftNodeDown(node);
        } else if (node.right.priority > node.left.priority && node.right.priority > node.priority) {
          var index_of_node = -1,
            index_of_son = -1;
          for (let i = 0; i < this.parentNodes.length; i++) {
            if (this.parentNodes[i] == node)
              index_of_node = i;
            else if (this.parentNodes[i] == node.right)
              index_of_son = i;
          }

          if (index_of_son != -1) {
            this.parentNodes[index_of_son] = node;
          }
          if (index_of_node != -1) {
            this.parentNodes[index_of_node] = node.right;
          }
          if (node == this.root)
            this.root = node.right;

          node.right.swapWithParent();
          this.shiftNodeDown(node);
        }
      } else if (node.left.priority > node.priority) {
        var index_of_node = -1,
          index_of_son = -1;
        for (let i = 0; i < this.parentNodes.length; i++) {
          if (this.parentNodes[i] == node)
            index_of_node = i;
          else if (this.parentNodes[i] == node.left)
            index_of_son = i;
        }

        if (index_of_son != -1) {
          this.parentNodes[index_of_son] = node;
        }
        if (index_of_node != -1) {
          this.parentNodes[index_of_node] = node.left;
        }
        if (node == this.root)
          this.root = node.left;

        node.left.swapWithParent();
        this.shiftNodeDown(node);
      }
    }
  }

}

module.exports = MaxHeap;
