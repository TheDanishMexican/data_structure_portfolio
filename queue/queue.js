export default class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    enqueue(data) {
        const newNode = new Node(data);

        if (this.tail) {
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            this.head = newNode;
            this.tail = newNode;
        }

        this.length++;
    }

    dequeue() {
        if (!this.head) {
            return null;
        }

        const dequeuedData = this.head.data;
        this.head = this.head.next;
        this.length--;

        if (!this.head) {
            this.tail = null;
            this.length = 0;
        }

        return dequeuedData;
    }

    peek() {
        if (this.head) {
            return this.head.data;
        } else return null;
    }

    size() {
        return this.length;
    }

    get(index) {
        if (index > this.length - 1 || index < 0) return null;

        let current = this.head;

        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        return current.data;
    }
}

export class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
