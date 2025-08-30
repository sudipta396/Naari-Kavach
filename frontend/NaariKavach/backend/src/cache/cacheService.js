class CacheService {
    constructor() {
        this.cache = {};
    }

    set(key, value, ttl = 60) {
        const expires = Date.now() + ttl * 1000;
        this.cache[key] = { value, expires };
    }

    get(key) {
        const cached = this.cache[key];
        if (!cached) return null;
        if (Date.now() > cached.expires) {
            delete this.cache[key];
            return null;
        }
        return cached.value;
    }

    has(key) {
        const cached = this.cache[key];
        return cached && Date.now() <= cached.expires;
    }

    del(key) {
        delete this.cache[key];
    }

    clear() {
        this.cache = {};
    }

    size() {
        return Object.keys(this.cache).length;
    }
}

module.exports = new CacheService();
