/**
 * The task is to build an in-memory key-value store (cache). You can use any in-built complex data types like Map, Set, etc.. (or you can use your custom Map from the map exercise above 😉 )
Your cache should be configurable with the following options:
* size: The max number of items the cache can hold
* strategy: The replacement/eviction strategy to use. LRU
* ttl: A duration after which the item should be automatically evicted from the cache. i.e The item is stale
 */
// class
// add(data, key)
// get(key)
// delete(key)
// const myCache = new LRUCache(size, ttl);
// myCache.add(data, key)
// number

// feedback
// 1. Performance.
//

class LRUCache {
  private size: number;
  private ttl: number;
  private cache: Map<string, any>;
  private timestamps: Map<string, number>;

  constructor(size: number, ttl: number) {
    this.size = size;
    this.ttl = ttl;
  }

  // class methods
  add(key: string, data: any) {
    this.evictStaleItems(); // evict the stale cached itmes
    if (this.cache.size >= this.size) {
      // this doesn't actually get the old key
      const oldKey = this.cache.keys().next().value;
      this.cache.delete(oldKey);
      this.timestamps.delete(oldKey);
    }
    // save the new value;
    this.cache.set(key, data);
    this.timestamps.set(key, Date.now());
  }

  // refine this method.
  get(key: string): any {
    if (!this.cache.has(key)) {
      return undefined;
    }
    const value = this.cache.get(key);
    return value;
  }

  // eviction... it's automatice
  private evictStaleItems(): void {
    // get the current time.
    // traverse the timestamps.
    // check for ttl value. if expired, we evict item.. evict timestamp

    const currentTime = Date.now();
    for (const [key, timestamp] of this.timestamps) {
      const timeDifference = currentTime - timestamp;
      if (timeDifference > this.ttl) {
        /// evict the item from our cach.....
        this.timestamps.delete(key);
        this.cache.delete(key);
      }
    }
  }
}
