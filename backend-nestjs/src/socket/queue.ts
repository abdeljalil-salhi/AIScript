/**
 * Queue data structure
 *
 * @export
 * @class Queue
 * @template T
 * @description
 * A queue is a data structure that follows the FIFO (First In First Out) principle.
 * This means that the first element added to the queue will be the first one to be removed.
 *
 * @example
 * const queue = new Queue<number>();
 * queue.enqueue(1);
 * queue.enqueue(2);
 * queue.enqueue(3);
 *
 * console.log(queue.dequeue()); // 1
 * console.log(queue.dequeue()); // 2
 * console.log(queue.dequeue()); // 3
 */
export class Queue<T> {
  /**
   * The items in the queue
   * @type {Array<T>}
   */
  private items: Array<T> = new Array<T>();

  /**
   * Creates an instance of the Queue class.
   *
   * @param {Array<T>} [content=[]] - The items to add to the queue
   */
  constructor(content: Array<T> = new Array<T>()) {
    this.items = content;
  }

  /**
   * Adds an item to the queue
   *
   * @param {T} item - The item to add
   * @returns {void}
   */
  public enqueue(item: T): void {
    this.items.push(item);
  }

  /**
   * Removes an item from the queue
   *
   * @returns {T | undefined} - The item removed from the queue
   */
  public dequeue(): T | undefined {
    return this.items.shift();
  }

  /**
   * Returns the size of the queue
   *
   * @returns {number} - The size of the queue
   */
  public size(): number {
    return this.items.length;
  }

  /**
   * Checks if the queue is empty
   *
   * @returns {boolean} - True if the queue is empty, false otherwise
   */
  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Returns the first item in the queue
   *
   * @returns {T | undefined} - The first item in the queue
   */
  public peek(): T | undefined {
    return this.items[0];
  }

  /**
   * Returns the items in the queue
   *
   * @returns {T[]} - The items in the queue
   */
  public getItems(): T[] {
    return this.items;
  }
}
