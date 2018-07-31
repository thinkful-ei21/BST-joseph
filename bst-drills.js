'use strict';

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // if the tree is empty then this key being inserted is the root node
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    // if the tree already exists, then start at the root
    // compare it to the key you want to insert
    // if the new key is less than the node's key
    // then the new node needs to live in the left-hand branch
    else if (key > this.key) {

      // traverse left
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } 
      else {
        // traverse left recursively
        this.left.insert(key, value);
      }

    } 
    else {
      // traverse right
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } 
      else {
        // traverse right recursively
        this.right.insert(key, value);
      }
    }
  }

  insertMany(arr) {
    arr.forEach(element => this.insert(element));
  }

  find(key) {

    // if the item is found at the root then return that value
    if (this.key === key) {
      return this.value;
    }

    // if the item you are looking for is less than the root
    // then follow the left child
    // if there is an existing left child
    // then recursively check its left and/or right child
    // until you find the item
    else if (key < this.key && this.left) {
      return this.left.find(key);
    } 
    else if (key > this.key && this.right) {
      return this.right.find(key);
    } 
    else {
      throw new Error('Key Not Found');
    }
  }

  remove(key) {

    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);

      } 
      else if (this.left) {
        // if the node only has a left child
        // then replace the node with its left child
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      } 
      else {

        // if the node has no children
        // simply remove it and any references to it
        // by calling `this._replaceWith(null)`
        this._replaceWith(null);
      }
    } 
    else if (key < this.key && this.left) {
      this.left.remove(key);
    } 
    else if (key > this.key && this.right) {
      this.right.remove(key);
    } 
    else {
      throw new Error('Key Not Found');
    }
  }

  _replaceWith(node) {

    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } 
      else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    }

    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _findMax() {
    if (!this.right) {
      return this;
    }
    return this.right._findMax();
  }

}

// DRILLS //
const input1 = [3, 1, 4, 6, 9, 2, 5, 7];
const input2 = [106, 148, 63, 211, 78, 25, 7, 49];
const input3 = [3, 3, 2, 2, 1, 1, 5, 5, 1, 1];
const input4 = [2, 1, 3, 5, 7];

// BST Creation //
const BST = new BinarySearchTree();
BST.insertMany(input2);

// Depth of BST //
const maxDepth = node => {
  if (!node) {
    return 0;
  }
  else {
    return Math.max(maxDepth(node.left), maxDepth(node.right)) + 1;
  }
};

// Find Largest Value //
const largestValue = bst => {
  if (!bst.right) {
    return bst.key;
  }
  return largestValue(bst.right);
};

// Find Smallest Value //
const smallestValue = bst => {
  if (!bst.left) {
    return bst.key;
  }
  return smallestValue(bst.left);
};

// Third largest key //
const thirdLargest = bst => {

};


// Is it a BST? //
const isBST = (node, min = -Infinity, max = Infinity) => {
  if (!node) {
    return true;
  }
  if (node.key <= min || node.key > max) {
    return false;
  }
  return isBST(node.left, min, node.key) && isBST(node.right, node.key, max);
};

// Balanced BST //
const balancedBST = node => {
  
  if (Math.abs(maxDepth(node.left) - maxDepth(node.right)) > 1) {
    return false;
  }
  else {
    return true;
  }
};

// console.log(BST);
// console.log(maxDepth(BST));
console.log(balancedBST(BST));
// console.log(isBST(BST));