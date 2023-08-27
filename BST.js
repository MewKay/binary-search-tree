const Node = function NodeFactory(data = null) {
  let leftChild = null;
  let rightChild = null;

  return {
    data,
    leftChild,
    rightChild,
  };
};
