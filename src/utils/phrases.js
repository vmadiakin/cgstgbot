const {WELCOMEBONUS, REFERRALWELCOMEBONUS} = require("../controllers/bonus");
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
    ConditionsForParticipationInTheReferralProgram: {
        'ru': `Условия участия в реферальной программе:
        1. Регистрация и Участие:
        Для участия в реферальной программе необходимо получить ссылку для приглашения в меню реферальной программы.
        Твоя реферальная ссылка придет в ответном сообщении после нажатия кнопки "Ссылка на приглашение"
        Отправляй свою реферальную ссылку, всем кто захочет использовать аппарат CokGuzelSu.
        2. Выгоды для приглашенных пользователей:
        Каждый пользователь, зарегистрировавшийся по твоей ссылке, получит дополнительную стартовую выгоду в размере 25 бонусов 🎁. 
        3. Выгоды за приглашения:
        Ты получишь 3% от потраченной суммы денег пользователями, которых ты пригласил, в виде бонусов.
        Дополнительно, ты получишь 1% от потраченной суммы денег пользователями, приглашенными теми, кого ты пригласил.
        4. Начисление бонусов:
        Бонусы начисляются на счет пользователя автоматически после завершения покупки приглашенными пользователями.
        5. Использование бонусов:
        Бонусы используются автоматически для оплаты услуг CokGuzelSu в размере 50% от суммы покупки.
        6. Изменения в Условиях:
        CokGuzelSu оставляет за собой право в любой момент изменить условия реферальной программы. Уведомления об изменениях будут отправлены пользователям в чате Telegram бота CokGuzelSu.
        7. Поддержка:
        В случае вопросов, предложений или проблем с реферальной программой, пользователи могут обращаться в службу поддержки CokGuzelSu.`,
        'en': `Conditions for participation in the referral program:
         1. Registration and Participation:
         To participate in the referral program, you must receive an invitation link in the referral program menu.
         Your referral link will come in a response message after clicking the "Invite Link" button
         Send your referral link to everyone who wants to use the CokGuzelSu device.
         2. Benefits for invited users:
         Each user who registers using your link will receive an additional starting benefit of 25 bonuses 🎁.
         3. Benefits for invitations:
         You will receive 3% of the amount of money spent by the users you invited in the form of bonuses.
         Additionally, you will receive 1% of the amount spent by users invited by those whom you have invited.
         4. Accrual of bonuses:
         Bonuses are credited to the user's account automatically after the completion of the purchase by invited users.
         5. Use of bonuses:
         Bonuses are used automatically to pay for CokGuzelSu services in the amount of 50% of the purchase amount.
         6. Changes to the Terms:
         CokGuzelSu reserves the right to change the terms of the referral program at any time. Notifications of changes will be sent to users in the Telegram chat of the CokGuzelSu bot.
         7. Support:
         In case of questions, suggestions or problems with the referral program, users can contact CokGuzelSu support service.`,
        'tr': `Yönlendirme programına katılım koşulları:
         1. Kayıt ve Katılım:
         Yönlendirme programına katılmak için yönlendirme programı menüsünde bir davet bağlantısı almanız gerekir.
         Yönlendirme bağlantınız, "Bağlantıyı davet et" düğmesini tıkladıktan sonra bir yanıt mesajıyla gelecektir
         ÇokGüzelSu cihazını kullanmak isteyen herkese yönlendirme bağlantınızı gönderin.
         2. Davet edilen kullanıcılar için avantajlar:
         Bağlantınızı kullanarak kaydolan her kullanıcı, 25 bonustan oluşan ek bir başlangıç ​​avantajına sahip olacaktır 🎁.
         3. Davetiyelerin faydaları:
         Davet ettiğiniz kullanıcıların harcadığı paranın %3'ünü bonus şeklinde alacaksınız.
         Ek olarak, kişisel olarak davet ettiğin kişiler tarafından davet edilen kullanıcıların harcadığı tutarın %1'ini alacaksın.
         4. İkramiyelerin tahakkuku:
         Bonuslar, davet edilen kullanıcılar tarafından satın alma işlemi tamamlandıktan sonra otomatik olarak kullanıcının hesabına aktarılır.
         5. Bonusların kullanımı:
         Bonuslar, ÇokGüzelSu hizmetlerinin ödemesinde satın alma tutarının %50'si oranında otomatik olarak kullanılır.
         6. Şartlarda Değişiklikler:
         ÇokGüzelSu, yönlendirme programının koşullarını dilediği zaman değiştirme hakkını saklı tutar. Değişiklik bildirimleri ÇokGüzelSu botunun Telegram sohbetinde kullanıcılara gönderilecek.
         7. Destek:
         Kullanıcılar yönlendirme programıyla ilgili soru, öneri veya sorun yaşamaları durumunda ÇokGüzelSu destek hizmetiyle iletişime geçebilirler.`
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
    generateReferralInviteLink1 : {
        'ru': 'Это твоя реферальная ссылка -',
        'en': 'This is your referral link -',
        'tr': 'Bu sizin yönlendirme bağlantınızdır -'
    },
    generateReferralInviteLink2 : {
        'ru': '🌟. Каждый пользователь, зарегистрировавшийся по твоей ссылке, получит дополнительный стартовый бонус 🎁. При этом ты будешь получать бонусы от каждой покупки не только пользователей, которых ты пригласил, но и тех, кого они пригласят 🔥',
        'en': '🌟. Each user who registers using your link will receive an additional starting bonus 🎁. At the same time, you will receive bonuses from every purchase not only from the users you invited, but also from those they invite 🔥',
        'tr': '🌟. Bağlantınızı kullanarak kaydolan her kullanıcı ek bir başlangıç ​​bonusu alacaktır 🎁. Aynı zamanda sadece davet ettiğiniz kullanıcılardan değil, davet ettikleri kişilerden de her satın alma işleminde bonus alacaksınız 🔥'
    },
    supportMenu : {
        'ru': 'Меню поддержки',
        'en': 'Support menu',
        'tr': 'Destek menüsü'
    },
}
module.exports = { phrasesFromLanguage }