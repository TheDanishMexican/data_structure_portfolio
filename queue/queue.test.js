import Queue from './queue.js';

describe('Queue Class', () => {
    let queue;

    beforeEach(() => {
        queue = new Queue();
    });

    test('should enqueue an element', () => {
        queue.enqueue(1);
        expect(queue.size()).toBe(1);
        expect(queue.peek()).toBe(1);
    });

    test('should enqueue multiple elements', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.size()).toBe(2);
        expect(queue.peek()).toBe(1);
    });

    test('should dequeue an element', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        const dequeued = queue.dequeue();
        expect(dequeued).toBe(1);
        expect(queue.size()).toBe(1);
        expect(queue.peek()).toBe(2);
    });

    test('should return null when dequeuing from an empty queue', () => {
        expect(queue.dequeue()).toBeNull();
    });

    test('should return the correct element at a specific index', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.get(0)).toBe(1);
        expect(queue.get(1)).toBe(2);
        expect(queue.get(2)).toBeNull();
        expect(queue.get(-1)).toBeNull();
    });

    test('should return null when peeking into an empty queue', () => {
        expect(queue.peek()).toBeNull();
    });

    test('should correctly size the queue', () => {
        expect(queue.size()).toBe(0);
        queue.enqueue(1);
        expect(queue.size()).toBe(1);
        queue.dequeue();
        expect(queue.size()).toBe(0);
    });
});

