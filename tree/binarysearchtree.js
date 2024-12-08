class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    add(item) {
        if (!this.root) {
            const newNode = new Node(item);
            this.root = newNode;
            return newNode;
        }

        let node = this.root;

        while (true) {
            if (item < node.item) {
                if (node.left) {
                    node = node.left;
                } else {
                    const leftChild = node.createChild(node, item);
                    leftChild.updateHeight();
                    this.root = this.root.maintain();
                    return leftChild;
                }
            } else if (item > node.item) {
                if (node.right) {
                    node = node.right;
                } else {
                    const rightChild = node.createChild(node, item);
                    rightChild.updateHeight();
                    this.root = this.root.maintain();
                    return rightChild;
                }
            } else {
                console.log("Duplicate value. Node not added.");
                return null;
            }
        }
    }

    print() {
        // Print the tree in a nice way - by creating a (jagged) 2D array of the tree
        // each level (starting from root) is an array in the array that doubles in size from the previous level

        // breaks if the tree is too deep - but that's a problem for another day

        // Use DFS to fill array with values
        const treeArray = [];
        let height = 0; // and while we're at it, calculate the height of the tree
        buildTreeArray(this.root, 0, 0);

        // Does a Depth-First-Scan of the Tree,
        // keeping track of the current depth (how far down from the top)
        // and the current indent (how far right from the (possible) left-most node at this depth)
        // stores the node values in a 2D array
        function buildTreeArray(node, depth, indent) {
            if (!node) {
                return;
            }
            height = Math.max(height, depth);
            // insert this node value in the 2D array
            if (!treeArray[depth]) treeArray[depth] = [];
            treeArray[depth][indent] = node.item;
            // visit its children - remember to double indent
            buildTreeArray(node.left, depth + 1, indent * 2);
            buildTreeArray(node.right, depth + 1, indent * 2 + 1);
        }

        // Apparently I'm not smart enough to calculate these, so here's a pre-calculated list
        const indentations = [1, 2, 5, 11, 23, 46, 93];

        let treeString = " ";
        // Display array - one level at a time
        for (let depth = 0; depth < treeArray.length; depth++) {
            const values = treeArray[depth];

            // Calculate indent for this depth (or find it in the pre-calculated table)
            let currentHeight = height - depth; // currentHeight is the distance from the bottom of the tree
            let indent = indentations[currentHeight];

            // Only display tree structure if we are not at the top
            if (depth > 0) {
                // Loop through half the values - and show a subtree with left and right
                for (let i = 0; i < values.length / 2; i++) {
                    treeString += " ".repeat(indent);
                    // Only show sub-tree if there are some values below
                    if (values[i * 2] != undefined || values[i * 2 + 1] != undefined) {
                        treeString += "┌";
                        treeString += "─".repeat(indent > 1 ? indent : 0);
                        treeString += "┴";
                        treeString += "─".repeat(indent > 1 ? indent : 0);
                        treeString += "┐";
                    } else {
                        treeString += "   " + "  ".repeat(indent > 1 ? indent : 0);
                    }
                    treeString += " ".repeat(indent);
                    // add a single space before the next "block"
                    treeString += " ";
                }
                // and finalize the current line
                treeString += "\n";
            }

            // Indent numbers one less than their "tree drawings"
            // Unless it is the first one, then it is two (or maybe three) less ... mystic math!
            if (depth == 0) {
                treeString += " ".repeat(indent - 2);
            } else {
                treeString += " ".repeat(indent - 1);
            }

            // display values
            for (let i = 0; i < values.length; i++) {
                // if both children are undefined, don't show any of then
                // if only one child is, show it as underscores _
                const showUndefined = !values[i - (i % 2)] && !values[i - (i % 2) + 1] ? " " : "_";
                // if depth is lowest (height-1) - pad values to two characters
                if (depth == height) {
                    treeString += String(values[i] ?? showUndefined.repeat(2)).padStart(2, " ");
                    // and add a single space
                    treeString += " ";
                } else {
                    // otherwise center values in block of three
                    treeString += String(values[i] ?? showUndefined.repeat(3)).padEnd(2, " ").padStart(3, " ");

                    // and add twice the indentation of spaces + 1 in the middle
                    treeString += " ".repeat(indent - 1);
                    treeString += " ";
                    treeString += " ".repeat(indent - 1);
                }
            }

            // finalize the value-line
            treeString += "\n";
        }

        console.log(treeString);
    }

    traverse() {
        //helper function so that no parameter needs to be passed
        function traverseNode(node) {
            if (!node) {
                return;
            }

            traverseNode(node.left);
            console.log(node.item);
            traverseNode(node.right);
        }

        traverseNode(this.root);
    }

}

class Node {
    constructor(value) {
        this.item = value;
        this.parent = null;
        this.right = null;
        this.left = null;
        this.height = 0;
    }

    createChild(parent, item) {
        const newNode = new Node(item);

        if (item < this.item) {
            this.left = newNode;
        } else this.right = newNode;

        newNode.parent = parent;

        return newNode;
    }

    updateHeight() {
        let node = this;
        while (node) {
            const rightHeight = node.right ? node.right.height : -1;
            const leftHeight = node.left ? node.left.height : -1;

            node.height = 1 + Math.max(leftHeight, rightHeight);
            node = node.parent;
        }
    }

    //skew < -1 means it is right heavy, skew > 1 means it is left heavy, skew = 0, 1, -1 means balance

    skew() {
        const rightHeight = this.right ? this.right.height : -1;
        const leftHeight = this.left ? this.left.height : -1;
        const skew = leftHeight - rightHeight;
        return skew;
    }

    rotateRight() {
        const current = this; // The node we're rotating around
        const leftChild = current.left; // The left child becomes the new root of this subtree

        // Step 1: Promote the left child's right subtree to the current node's left child
        current.left = leftChild.right;
        if (leftChild.right) {
            leftChild.right.parent = current;
        }

        // Step 2: Update the left child's parent
        leftChild.parent = current.parent;

        // Step 3: Fix the parent's reference (if any)
        if (current.parent) {
            current.parent.right = leftChild;
        }

        // Step 4: Make the current node the right child of the left child
        leftChild.right = current;
        current.parent = leftChild;

        // Step 5: Update heights (bottom-up)
        current.updateHeight();
    }

    rotateLeft() {
        const current = this; // The node we're rotating around
        const rightChild = current.right; // The right child becomes the new root of this subtree

        // Step 1: Promote the right child's left subtree to the current node's right child
        current.right = rightChild.left;
        if (rightChild.left) {
            rightChild.left.parent = current;
        }

        // Step 2: Update the right child's parent
        rightChild.parent = current.parent;

        // Step 3: Fix the parent's reference (if any)
        if (current.parent) {
            current.parent.left = rightChild;
        }

        // Step 4: Make the current node the left child of the right child
        rightChild.left = current;
        current.parent = rightChild;

        // Step 5: Update heights (bottom-up)
        current.updateHeight();
    }

    maintain() {
        const root = this;
        let node = this;
        const skew = node.skew();

        // If the node is unbalanced (skew is either > 1 or < -1)
        if (skew > 1 || skew < -1) {
            // Perform a rebalance based on the skew
            node.rebalance(skew);
            //if there is no skew we do not rebalance because the tree already is balanced
        } else return root;

        // Recursively maintain balance for the left child, if it exists
        if (node.left) {
            node.left.maintain();
        }

        // Recursively maintain balance for the right child, if it exists
        if (node.right) {
            node.right.maintain();
        }

        //this loop makes sure that we always return the new root if root was reassigned
        while (node.parent) {
            node = node.parent;
        }
        return node;


    }

    rebalance(skew) {
        if (skew > 1) {
            this.rotateRight();
        } else if (skew < -1) {
            this.rotateLeft();
        }
    }



}

const bsTree = new BinarySearchTree();
bsTree.add(4);
bsTree.add(3);
bsTree.add(2);
bsTree.add(1);
bsTree.add(99);
bsTree.add(215);
bsTree.add(999);
bsTree.add(100);
bsTree.add(99999);

bsTree.print();



