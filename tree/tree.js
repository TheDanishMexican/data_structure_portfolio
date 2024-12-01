export class Tree {
    constructor(root) {
        this.root = root;
    }

    dump() {
        console.log(this);
    }

    addValue(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode;
        }

        this.root.appendChild(newNode);
    }

    //Lav denne færdig og forstå

    findValue(value) {
        if (this.root.value == value) {
            return root;
        }

        for (const childNode of this.root.childNodes) {
            const foundNode = this.search(childNode, value);
            if (foundNode) {
                return foundNode;
            }
        }

        //Hvis value ikke findes i vores tree
        return null;
    }

    search(childNode, value) {
        if (childNode.value == value) {
            return childNode;
        } else {
            for (const grandChildNode of childNode.childNodes) {
                const foundNode = this.search(grandChildNode, value);
                //lag 3 - rekursiv 1
                if (foundNode) return foundNode;
            }
        }

        return null;
    }

    //Lav denne færdig og forstå

    removeValue(value) {
        const nodeWithValue = this.findValue(value);
        if (nodeWithValue) {
            const parent = nodeWithValue.parent;
            parent.removeChild(nodeWithValue);
            return parent;
        }

        else return null;
    }

}




export class Node {
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



