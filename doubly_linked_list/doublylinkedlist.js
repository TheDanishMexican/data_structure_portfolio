const node1 = {
    previous: null,
    next: null,
    data: "C"
};

const node2 = {
    prev: null,
    next: null,
    data: "A"
};

const node3 = {
    prev: null,
    next: null,
    data: "T"
};

export default class DoublyLinkedList {
    constructor() {
        this.head = node1;
        this.tail = node2;
        this.length = 0;
    }

    addLast(data) {
        const newNode = new Node(data);

        if (this.tail) {
            newNode.previous = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            this.head = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    addFirst(data) {
        const newNode = new Node(data);

        if (this.head) {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        } else {
            this.head = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;

        let current = this.head;

        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.data;
    }

    indexOf(data) {
        let index = 0;
        let current = this.head;

        while (current) {
            if (current.data === data) return index;
            current = current.next;
            index++;
        }

        return -1;
    }

    insertAfter(index, data) {
        if (index < 0 || index >= this.length) return;

        const newNode = new Node(data);
        let current = this.head;

        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        newNode.next = current.next;
        newNode.prev = current;

        if (current.next) {
            current.next.prev = newNode;
        } else {
            this.tail = newNode;
        }

        current.next = newNode;
        this.length++;
    }

    insertBefore(index, data) {
        if (index <= 0 || index > this.length) return;

        const newNode = new Node(data);
        let current = this.head;

        for (let i = 1; i < index; i++) {
            current = current.next;
        }

        newNode.prev = current.prev;
        newNode.next = current;

        if (current.prev) {
            current.prev.next = newNode;
        } else {
            this.head = newNode;
        }

        current.prev = newNode;
        this.length++;
    }

    first() {
        if (this.head) {
            return this.head.data;
        } else return null;
    }

    last() {
        if (this.tail) {
            return this.tail.data;
        } else return null;
    }

    remove(data) {
        let current = this.head;

        while (current && current.data !== data) {
            current = current.next;
        }

        if (!current) return;

        if (current === this.head) {

            this.head = current.next;

            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
        } else {

            current.prev.next = current.next;

            if (current.next) {
                current.next.prev = current.prev;
            } else {
                this.tail = current.prev;
            }
        }

        this.length--;
    }

    removeIndex(index) {
        let current = this.head;

        if (index < 0 || index >= this.length) return;

        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        if (current === this.head) {

            this.head = current.next;

            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
        } else {

            current.prev.next = current.next;

            if (current.next) {
                current.next.prev = current.prev;
            } else {
                this.tail = current.prev;
            }
        }

        this.length--;
    }

    removeFirst() {
        let current = this.head;

        if (this.head) {
            this.head = current.next;

            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }

            this.length--;
        } else return;
    }

    removeLast() {
        let current = this.tail;

        if (this.tail) {
            this.tail = current.prev;

            if (this.tail) {
                this.tail.next = null;
            } else {
                this.head = null;
            }

            this.length--;
        } else return;
    }

    addNodeLast(newNode) {
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;;
        }
    }

    addNodeFirst(newNode) {
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    insertAfterNode(newNodeData, existingNode) {
        if (!existingNode) return;

        let indexToInsertAfter = this.indexOf(existingNode.data);

        if (indexToInsertAfter === -1) return;

        this.insertAfter(indexToInsertAfter, newNodeData);
    }

    insertBeforeNode(newNodeData, existingNode) {
        if (!existingNode) return;

        let indexToInsertBefore = this.indexOf(existingNode.data);

        if (indexToInsertBefore === -1) return;

        this.insertBefore(indexToInsertBefore, newNodeData);
    }

    removeNode(existingNode) {
        if (!existingNode) return;

        if (existingNode === this.head) {
            this.head = existingNode.next;
            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
        } else {
            if (existingNode.prev) {
                existingNode.prev.next = existingNode.next;
            }

            if (existingNode.next) {
                existingNode.next.prev = existingNode.prev;
            } else {
                this.tail = existingNode.prev;
            }
        }

        this.length--;
    }

    nodeAt(index) {
        if (index < 0 || index >= this.length) return null;

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        return current;
    }

    //Forstår ikke helt denne her, så den skal der lige kigges videre på, men den fungerer i hvert fald
    swapNodes(nodeA, nodeB) {
        if (nodeA === nodeB || !nodeA || !nodeB) return;

        if (!this.head || !this.tail) return;

        function swap(a, b) {
            if (a.prev) a.prev.next = b;
            if (b.next) b.next.prev = a;
            if (b.prev) b.prev.next = a;
            if (a.next) a.next.prev = b;
        };

        const isHeadA = nodeA === this.head;
        const isTailA = nodeA === this.tail;
        const isHeadB = nodeB === this.head;
        const isTailB = nodeB === this.tail;

        if (isHeadA) {
            this.head = nodeB;
        } else if (isHeadB) {
            this.head = nodeA;
        }

        if (isTailA) {
            this.tail = nodeB;
        } else if (isTailB) {
            this.tail = nodeA;
        }

        swap(nodeA, nodeB);

        const tempNext = nodeA.next;
        const tempPrev = nodeA.prev;

        nodeA.next = nodeB.next;
        nodeA.prev = nodeB.prev;

        nodeB.next = tempNext;
        nodeB.prev = tempPrev;

        if (nodeA.next) nodeA.next.prev = nodeA;
        if (nodeB.next) nodeB.next.prev = nodeB;

        if (nodeA.prev) nodeA.prev.next = nodeA;
        if (nodeB.prev) nodeB.prev.next = nodeB;
    }


    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    size() {
        return this.length;
    }

    dumpList() {
        console.log("Doubly linked list:\n");

        console.log("_____");
        console.log(`head: ${this.head ? this.head.data : "null"}`);
        console.log(`tail: ${this.tail ? this.tail.data : "null"}`);
        console.log("_____");

        // Traverse and print each node
        let current = this.head;
        let index = 0;

        while (current) {
            console.log("____");
            if (current === this.head) console.log("HEAD");
            if (current === this.tail) console.log("TAIL");
            console.log(`node ${index}: ${current.data}`);
            console.log(`previous: ${current.prev ? current.prev.data : "null"}`);
            console.log(`next: ${current.next ? current.next.data : "null"}`);
            console.log("____\n");

            current = current.next;
            index++;
        }
    }




}

export class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}

