const Node = function NodeFactory(data = null) {
  let leftChild = null;
  let rightChild = null;

  return {
    data,
    leftChild,
    rightChild,
  };
};

const Tree = function TreeFactory(array) {
  const format = function sortAndRemoveDuplicateFromArray(array) {
    let result = [...array].sort((a, b) => a - b);
    return [...new Set(result)];
  };

  const buildTree = function convertArrayToBST(array, firstIndex, lastIndex) {
    if (firstIndex > lastIndex) {
      return null;
    }

    const middleIndex = Math.floor((firstIndex + lastIndex) / 2);
    const currentNode = Node(array[middleIndex]);
    currentNode.leftChild = convertArrayToBST(
      array,
      firstIndex,
      middleIndex - 1
    );
    currentNode.rightChild = convertArrayToBST(
      array,
      middleIndex + 1,
      lastIndex
    );
    return currentNode;
  };

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }

    if (node.rightChild !== null) {
      prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  let formattedArray = format(array);
  let root = buildTree(formattedArray, 0, formattedArray.length - 1);

  const insert = function insertValueToTreeLeaf(value, node = root) {
    if (node === null) {
      return Node(value);
    }

    if (value < node.data) {
      node.leftChild = insertValueToTreeLeaf(value, node.leftChild);
    } else if (value > node.data) {
      node.rightChild = insertValueToTreeLeaf(value, node.rightChild);
    }

    return node;
  };

  const remove = function deleteNodeWithValueFromTree(value, node = root) {
    if (node === null) {
      return node;
    }

    if (node.data > value) {
      node.leftChild = deleteNodeWithValueFromTree(value, node.leftChild);
      return node;
    }
    if (node.data < value) {
      node.rightChild = deleteNodeWithValueFromTree(value, node.rightChild);
      return node;
    }

    if (node.leftChild === null) {
      const tempNode = node.rightChild;
      return tempNode;
    } else if (node.rightChild === null) {
      const tempNode = node.leftChild;
      return tempNode;
    } else {
      let nodeWithSuccessors = node;
      let successor = node.rightChild;

      while (successor.leftChild !== null) {
        nodeWithSuccessors = successor;
        successor = successor.leftChild;
      }

      if (nodeWithSuccessors !== node) {
        nodeWithSuccessors.leftChild = successor.rightChild;
      } else {
        nodeWithSuccessors.rightChild = successor.leftChild;
      }

      node.data = successor.data;

      return node;
    }
  };

  const find = function findNodeWithValue(value, node = root) {
    if (node === null) {
      return node;
    }

    if (node.data > value) {
      return findNodeWithValue(value, node.leftChild);
    } else if (node.data < value) {
      return findNodeWithValue(value, node.rightChild);
    }

    return node;
  };

  const levelOrder = function treeToArrayInLevelOrderIteratively(
    callback = undefined
  ) {
    let queue = [root];
    let arrayOfOrderedNode = [];

    while (queue.length > 0) {
      let currentNode = queue.shift();
      arrayOfOrderedNode.push(currentNode);

      if (currentNode.leftChild !== null) {
        queue.push(currentNode.leftChild);
      }

      if (currentNode.rightChild !== null) {
        queue.push(currentNode.rightChild);
      }
    }

    if (!callback) {
      return arrayOfOrderedNode.map((node) => node.data);
    } else {
      arrayOfOrderedNode.forEach((node) => callback(node));
    }
  };

  const levelOrderRec = function treeToArrayInLevelOrderRecursively(
    callback = undefined,
    queue = [root],
    arrayOfOrderedNode = []
  ) {
    if (queue.length <= 0) {
      return;
    }

    let currentNode = queue.shift();
    arrayOfOrderedNode.push(currentNode);

    if (currentNode.leftChild !== null) {
      queue.push(currentNode.leftChild);
    }

    if (currentNode.rightChild !== null) {
      queue.push(currentNode.rightChild);
    }

    treeToArrayInLevelOrderRecursively(undefined, queue, arrayOfOrderedNode);

    if (!callback) {
      return arrayOfOrderedNode.map((node) => node.data);
    } else {
      arrayOfOrderedNode.forEach((node) => callback(node));
    }
  };

  const inOrder = function treeToArrayInOrder(
    callback = undefined,
    node = root,
    arrayOfOrderedNode = []
  ) {
    if (node === null) {
      return;
    }

    treeToArrayInOrder(undefined, node.leftChild, arrayOfOrderedNode);
    arrayOfOrderedNode.push(node);
    treeToArrayInOrder(undefined, node.rightChild, arrayOfOrderedNode);

    if (!callback) {
      return arrayOfOrderedNode.map((node) => node.data);
    } else {
      arrayOfOrderedNode.forEach((node) => callback(node));
    }
  };

  const preOrder = function treeToArrayPreOrder(
    callback = undefined,
    node = root,
    arrayOfOrderedNode = []
  ) {
    if (node === null) {
      return;
    }

    arrayOfOrderedNode.push(node);
    treeToArrayPreOrder(undefined, node.leftChild, arrayOfOrderedNode);
    treeToArrayPreOrder(undefined, node.rightChild, arrayOfOrderedNode);

    if (!callback) {
      return arrayOfOrderedNode.map((node) => node.data);
    } else {
      arrayOfOrderedNode.forEach((node) => callback(node));
    }
  };

  const postOrder = function treeToArrayPostOrder(
    callback = undefined,
    node = root,
    arrayOfOrderedNode = []
  ) {
    if (node === null) {
      return;
    }

    treeToArrayPostOrder(undefined, node.leftChild, arrayOfOrderedNode);
    treeToArrayPostOrder(undefined, node.rightChild, arrayOfOrderedNode);
    arrayOfOrderedNode.push(node);

    if (!callback) {
      return arrayOfOrderedNode.map((node) => node.data);
    } else {
      arrayOfOrderedNode.forEach((node) => callback(node));
    }
  };

  const height = function calculateTreeHeight(node = root) {
    if (node === null) {
      return -1;
    }

    let leftHeight = calculateTreeHeight(node.leftChild);
    let rightHeight = calculateTreeHeight(node.rightChild);

    let longestPathHeight =
      leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;

    return longestPathHeight;
  };

  const depth = function calculateTreeDepth(node = root, currentNode = root) {
    if (currentNode === null) {
      return;
    }

    if (node.data === currentNode.data) {
      return 0;
    }

    let leftDepth = calculateTreeDepth(node, currentNode.leftChild);
    let rightDepth = calculateTreeDepth(node, currentNode.rightChild);

    let nodeDepth = leftDepth + 1 || rightDepth + 1;
    return nodeDepth;
  };

  const isBalanced = function checkIfTreeBalanced(node = root) {
    if (node === null) {
      return true;
    }

    let leftHeight = 0;
    let rightHeight = 0;

    if (node.leftChild !== null) {
      leftHeight = height(node.leftChild) + 1;
    }
    if (node.rightChild !== null) {
      rightHeight = height(node.rightChild) + 1;
    }

    const leftRightHeightDifference = Math.abs(leftHeight - rightHeight);
    const isHeightValid =
      checkIfTreeBalanced(node.leftChild) &&
      checkIfTreeBalanced(node.rightChild) &&
      leftRightHeightDifference <= 1;

    return isHeightValid;
  };

  const rebalance = function reconvertSortedArrayToTree() {
    if (root === null || isBalanced()) {
      return;
    }

    let newArray = inOrder();
    root = buildTree(newArray, 0, newArray.length - 1);
  };

  return {
    get root() {
      return root;
    },
    prettyPrint,
    insert,
    remove,
    find,
    levelOrder,
    levelOrderRec,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

const randomRange = function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let myArray = [];
for (let i = 0; i < 20; i++) {
  myArray.push(randomRange(1, 99));
}

console.log("This is the initial array to convert: ");
console.log(myArray);

let myTree = Tree(myArray);
console.log("The resulting tree:");
myTree.prettyPrint();

console.log(
  `Is the  given tree balanced ?: ${myTree.isBalanced() ? "Yes" : "No"}`
);

let arrayElements = [];
console.log("Elements in level order:");
myTree.levelOrder((node) => arrayElements.push(node.data));
console.log(arrayElements);
arrayElements = [];

console.log("Elements in pre order:");
myTree.preOrder((node) => arrayElements.push(node.data));
console.log(arrayElements);
arrayElements = [];

console.log("Elements in post order:");
myTree.postOrder((node) => arrayElements.push(node.data));
console.log(arrayElements);
arrayElements = [];

console.log("Elements in order:");
myTree.inOrder((node) => arrayElements.push(node.data));
console.log(arrayElements);
arrayElements = [];

for (let j = 0; j < 10; j++) {
  myTree.insert(randomRange(100, 999));
}
console.log("More values was added. The resulting tree: ");
myTree.prettyPrint();
console.log(
  `Is the given tree balanced ?: ${myTree.isBalanced() ? "Yes" : "No"}`
);

myTree.rebalance();

console.log("The tree was rebalanced, now the the new traversal orders: ");

console.log("Elements in level order:");
myTree.levelOrder((node) => arrayElements.push(node.data));
console.log(arrayElements);
arrayElements = [];

console.log("Elements in pre order:");
myTree.preOrder((node) => arrayElements.push(node.data));
console.log(arrayElements);
arrayElements = [];

console.log("Elements in post order:");
myTree.postOrder((node) => arrayElements.push(node.data));
console.log(arrayElements);
arrayElements = [];

console.log("Elements in order:");
myTree.inOrder((node) => arrayElements.push(node.data));
console.log(arrayElements);
arrayElements = [];

console.log("The final tree:");
myTree.prettyPrint();
