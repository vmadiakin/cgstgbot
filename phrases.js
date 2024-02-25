const {WELCOMEBONUS, REFERRALWELCOMEBONUS} = require("./bonus");
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
    refereeRegistrationCongratulations: {
        'ru': `Вам дополнительно зачислено ${REFERRALWELCOMEBONUS} бонусов 🤩 за регистрацию по приглашению от пользователя`,
        'en': `You will receive an additional ${REFERRALWELCOMEBONUS} bonuses 🤩 for registering by invitation from the user`,
        'tr': `Kullanıcının davetiyle kaydolduğunuzda ek ${REFERRALWELCOMEBONUS} bonusu 🤩 alacaksınız`
    },
    referralRegistrationCongratulations: {
        'ru': `🥳 Новый пользователь зарегистрировался по вашей реферальной ссылке -`,
        'en': `🥳 A new user registered using your referral link -`,
        'tr': `🥳 Yeni bir kullanıcı sizin yönlendirme bağlantınızı kullanarak kaydoldu -`
    },
    mainMenu : {
        'ru': 'Главное меню',
        'en': 'Main menu',
        'tr': 'Ana menü'
    },
    balanceMenu : {
        'ru': 'Меню баланса',
        'en': 'Balance menu',
        'tr': 'Denge menüsü'
    },
    referralMenu : {
        'ru': 'Меню реферальной программы',
        'en': 'Referral program menu',
        'tr': 'Tavsiye programı menüsü'
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
    },
    pourWaterMenu : {
        'ru': 'Меню налива воды',
        'en': 'Water filling menu',
        'tr': 'Su doldurma menüsü'
    },
    generateReferralInviteLink1: {
        'ru': 'Это твоя реферальная ссылка -',
        'en': 'This is your referral link -',
        'tr': 'Bu sizin yönlendirme bağlantınızdır -'
    },
    generateReferralInviteLink2: {
        'ru': '🌟. Каждый пользователь, зарегистрировавшийся по твоей ссылке, получит дополнительный стартовый бонус 🎁. При этом ты будешь получать бонусы от каждой покупки не только пользователей, которых ты пригласил, но и тех, кого они пригласят 🔥',
        'en': '🌟. Each user who registers using your link will receive an additional starting bonus 🎁. At the same time, you will receive bonuses from every purchase not only from the users you invited, but also from those they invite 🔥',
        'tr': '🌟. Bağlantınızı kullanarak kaydolan her kullanıcı ek bir başlangıç ​​bonusu alacaktır 🎁. Aynı zamanda sadece davet ettiğiniz kullanıcılardan değil, davet ettikleri kişilerden de her satın alma işleminde bonus alacaksınız 🔥'
    },
}
module.exports = { phrasesFromLanguage }