export default class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    add(data) {
        const node = new Node(data);
        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;

            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    remove(data) {
        if (this.head === null) return;

        if (this.head.data === data) {
            this.head = this.head.next;
            this.length--;
            return;
        }

        let current = this.head;

        while (current.next && current.next.data !== data) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
            this.length--;
        }
    }

    getFirst() {
        return this.head ? this.head.data : null;
    }

    getLast() {
        if (this.head === null) return null;

        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        return current.data;
    }

    getFirstNode() {
        return this.head;
    }

    getNextNode(node) {
        return node ? node.next : null;
    }

    getNodeWith(data) {
        let current = this.head;
        while (current) {
            if (current.data === data) return current;
            current = current.next;
        }
        return null;
    }

    removeFirstNode() {
        if (this.head === null) return;
        this.head = this.head.next;
        this.length--;
    }

    removeLastNode() {
        if (this.head === null) return;

        if (this.head.next === null) {
            this.head = null;
        } else {
            let current = this.head;
            while (current.next.next !== null) {
                current = current.next;
            }
            current.next = null;
        }
        this.length--;
    }

    removeNode(node) {
        if (this.head === null || node === null) return;

        if (this.head === node) {
            this.removeFirstNode();
            return;
        }

        let current = this.head;
        while (current.next && current.next !== node) {
            current = current.next;
        }

        if (current.next === node) {
            current.next = node.next;
        }
    }

    clear() {
        this.head = null;
        this.length = 0;
    }

    size() {
        return this.length;
    }

    dumpList() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }
}

export class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
