/**
 * An asynchronous queue of items of some type. Taking from the queue returns
 * a Promise that will fire when an item is ready (this Promise may already
 * be resolved if there were already items in the queue).
 */
export class AsyncQueue<A> {
  private items: Array<A> = [];
  private promises: Array<{resolve: (A) => void; reject: (any) => void}> = [];

  /**
   * Add an item to the queue.
   */
  offer(a: A): void {
    if (this.promises.length > 0) {
      this.promises.shift().resolve(a);
    } else {
      this.items.push(a);
    }
  }

  /**
   * Take an item from the queue, returning a Promise that will fire when an
   * item is available.
   */
  take(): Promise<A> {
    if (this.items.length > 0) {
      return Promise.resolve(this.items.shift());
    } else {
      var promises = this.promises;
      return new Promise((resolve, reject) => {
        promises.push({resolve: resolve, reject: reject});
      });
    }
  }

  /**
   * Close the queue. Any outstanding Promises will be rejected with an error
   * containing the given reason.
   */
  close(reason: string = 'queue closed'): void {
    while (this.promises.length > 0) {
      this.promises.shift().reject(new Error(reason));
    }
  }
}
