class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (node !== null) {
      if (this.left == null) {
        this.left = node;
        node.parent = this;
      } else if (this.right == null) {
        this.right = node;
        node.parent = this;
      }
    }
  }

  removeChild(node) {
    if (this.left == node) {
      this.left = null;
      node.parent = null;
    } else if (this.right == node) {
      this.right = null;
      node.parent = null;
    } else throw new Error();
  }

  remove() {
    if (this.parent !== null) {
      this.parent.removeChild(this);
    }
  }

  swapWithParent() {
    if (this.parent !== null) {
      var father = this.parent;
      var gfather = this.parent.parent;

      var lflag = false;
      var save_child = father.left;
      if (father.left == this) {
        lflag = true;
        save_child = father.right;
      }

      this.remove();
      father.remove();

      if (gfather !== null)
        gfather.appendChild(this);
      father.left = father.right = null;
      father.appendChild(this.left);
      father.appendChild(this.right);

      this.left = this.right = null;
      if (lflag) {
        this.appendChild(father);
        this.appendChild(save_child);
      } else {
        this.appendChild(save_child);
        this.appendChild(father);
      }
    }
  }
}

module.exports = Node;
