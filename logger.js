class Logger {
    constructor(prefix) {
        this.prefix = prefix;
    }

    getPrefix() {
        const date = new Date();
        const formattedDate = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        return `[${formattedDate}] <${this.prefix}>`;
    }

    log(message, ...args) {
        console.log(`${this.getPrefix()} ${message}`, ...args);
    }

    error(message, ...args) {
        console.error(`${this.getPrefix()} ${message}`, ...args);
    }

    warn(message, ...args) {
        console.warn(`${this.getPrefix()} ${message}`, ...args);
    }

    debug(message, ...args) {
        if (process.env.DEBUG === '1') {
            console.log(`${this.getPrefix()} ${message}`, ...args);
        }
    }
}

module.exports = Logger;
