const {WELCOMEBONUS} = require("./bonus");
const phrasesFromLanguage = {
    greetings : {
        'ru': 'Привет!',
        'en': 'Hello!',
        'tr': 'Merhaba!'
    },
    fromBotFailure : {
        'ru': 'Извините, но наш бот общается только с людьми.',
        'en': 'Sorry, but our bot only communicates with people.',
        'tr': 'Üzgünüz ama botumuz yalnızca insanlarla iletişim kuruyor.'
    },
    registrationCongratulations : {
        'ru': `Поздравляю с регистрацией! Вам зачислено ${WELCOMEBONUS} приветственных бонусов 😉`,
        'en': `Congratulations on your registration! You have been credited with ${WELCOMEBONUS} welcome bonuses 😉`,
        'tr': `Kayıtınız için tebrikler! ${WELCOMEBONUS} hoş geldin bonusu hesabınıza yatırıldı 😉`
    },
    mainMenu : {
        'ru': 'Главное меню',
        'en': 'Main menu',
        'tr': 'Ana menü'
    },
    balanceMenu : {
        'ru': 'Баланс',
        'en': 'Balance',
        'tr': 'Denge'
    },
    checkBalance1 : {
        'ru': 'ваш баланс составляет',
        'en': 'your balance is',
        'tr': 'bakiyeniz'
    },
    checkBalance2 : {
        'ru': 'TL и',
        'en': 'TL and',
        'tr': 'TL ve'
    },
    checkBalance3 : {
        'ru': 'бонусов.',
        'en': 'bonuses.',
        'tr': 'bonustur.'
    }
}
module.exports = { phrasesFromLanguage }