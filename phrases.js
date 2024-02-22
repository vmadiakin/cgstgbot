const {WELCOMEBONUS} = require("./bonus");
const phrases = {
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
    }
}
const greetings = {
    'ru': 'Привет!',
    'en': 'Hello!',
    'tr': 'Merhaba!'
};

const FromBotFailure = {
    'ru': 'Извините, но наш бот общается только с людьми.',
    'en': 'Sorry, but our bot only communicates with people.',
    'tr': 'Üzgünüz ama botumuz yalnızca insanlarla iletişim kuruyor.'
};

const registrationCongratulations = {
    'ru': `Поздравляю с регистрацией! Вам зачислено ${WELCOMEBONUS} приветственных бонусов 😉`,
    'en': `Congratulations on your registration! You have been credited with ${WELCOMEBONUS} welcome bonuses 😉`,
    'tr': `Kayıtınız için tebrikler! ${WELCOMEBONUS} hoş geldin bonusu hesabınıza yatırıldı 😉`
};

const mainMenu = {
    'ru': 'Главное меню',
    'en': 'Main menu',
    'tr': 'Ana menü'
};

module.exports = { greetings, FromBotFailure, registrationCongratulations, mainMenu, phrases }