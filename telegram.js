const TelegramBot = require('node-telegram-bot-api');

class Telegram {
    constructor(token) {
        this.bot = new TelegramBot(token, {polling: true});

        this.bot.on('polling_error', console.error);

        this.bot.on('message', (msg) => {
            if (msg.text) {
                if (msg.text.startsWith('/start')) {
                    this._onStart(msg);
                } else if (this._onMessage) {
                    this._onMessage(msg);
                }
            }
        });
    }

    onStart(callback) {
        this._onStart = callback;
    }

    onMessage(callback) {
        this._onMessage = callback;
    }

    async sendMessage(chatId, text, buttons = []) {
        let options = {};

        if (buttons.length > 0) {
            options = {
                reply_markup: JSON.stringify({
                    resize_keyboard: true,
                    one_time_keyboard: true,
                    keyboard: buttons.map((button) => [button])
                })
            };
        }

        return await this.bot.sendMessage(chatId, text, buttons);
    }
}

module.exports = { Telegram }