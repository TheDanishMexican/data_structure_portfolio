class Tree {
    constructor(root) {
        this.root = root;
    }

    dump() {
        console.log(this);
    }

}

class Node {
    constructor(value) {
        this.value = value;
        this.parent = null;
        this.childNodes = [];
    }

    dump() {
        console.log(this);
    }

    firstChild() {
        if (this.hasChildNodes()) {
            return this.childNodes[0];
        }

        return null;
    }

    lastChild() {
        if (this.hasChildNodes()) {
            return this.childNodes[this.childNodes.length - 1];
        }

        return null;
    }

    hasChildNodes() {
        if (this.childNodes.length) {
            return true;
        }

        return false;
    }

    appendChild(child) {
        this.childNodes.push(child);
        child.parent = this;
    }

    removeChild(child) {
        const index = this.childNodes.indexOf(child);
        if (index !== -1) {
            child.parent = null;
            return this.childNodes.splice(index, 1)[0];
        }

        return null;
    }

    replaceChild(newChild, oldChild) {
        const oldChildIndex = this.childNodes.indexOf(oldChild);
        if (oldChildIndex !== -1) {
            this.childNodes.splice(oldChildIndex, 1, newChild);
            newChild.parent = this;
            oldChild.parent = null;
            return oldChild;
        }

        return null;
    }
}

const rootNode = new Node("root");
const child1 = new Node("child1");
const child2 = new Node("child2");

rootNode.appendChild(child1);
rootNode.appendChild(child2);

const rootTree = new Tree(rootNode);