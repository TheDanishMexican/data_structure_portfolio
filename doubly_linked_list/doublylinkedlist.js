export default class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
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


}

export class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}

