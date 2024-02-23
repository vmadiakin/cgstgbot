const buttonsNameFromLanguage = {
    pourWater: {
        'ru': 'Налить воду',
        'en': 'Pour water',
        'tr': 'Su dökün'
    },
    balance: {
        'ru': 'Баланс',
        'en': 'Balance',
        'tr': 'Denge'
    },
    referralProgram: {
        'ru': 'Реферальная программа',
        'en': 'Referral program',
        'tr': 'Tavsiye programı'
    },
    support: {
        'ru': 'Поддержка',
        'en': 'Support',
        'tr': 'Destek'
    },
    replenishBalance: {
        'ru': 'Пополнить баланс',
        'en': 'Replenish Balance',
        'tr': 'Bakiyeyi tamamla'
    },
    checkBalance: {
        'ru': 'Проверить баланс',
        'en': 'Check Balance',
        'tr': 'Çek dengesi'
    },
    back: {
        'ru': 'Назад',
        'en': 'Back',
        'tr': 'Geri'
    },
    waterOptions: {
        'ru': ['1 литр', '5 литров', '19 литров', 'Другое количество', 'Настройки озона', 'Выбор водомата'],
        'en': ['1 liter', '5 liters', '19 liters', 'Other quantity', 'Ozone settings', 'Water dispenser selection'],
        'tr': ['1 litre', '5 litre', '19 litre', 'Diğer miktar', 'Ozon ayarları', 'Su seçimi']
    },
}
// Клавиатура основного меню
const mainKeyboard = (userLanguage) => ({
    inline_keyboard: [
        [
            { text: buttonsNameFromLanguage.pourWater[userLanguage] || buttonsNameFromLanguage.pourWater['en'], callback_data: "pourWater" },
            { text: buttonsNameFromLanguage.balance[userLanguage] || buttonsNameFromLanguage.pourWater['en'], callback_data: "balance" },
        ],
        [
            { text: buttonsNameFromLanguage.referralProgram[userLanguage] || buttonsNameFromLanguage.pourWater['en'], callback_data: "referralProgram" },
            { text: buttonsNameFromLanguage.support[userLanguage] || buttonsNameFromLanguage.pourWater['en'], callback_data: "support" },
        ],
    ],
});

// Клавиатура для баланса
const balanceKeyboard= (userLanguage) => ({
    inline_keyboard: [
        [
            { text: buttonsNameFromLanguage.replenishBalance[userLanguage] || buttonsNameFromLanguage.replenishBalance['en'], callback_data: "replenishBalanceAction" },
            { text: buttonsNameFromLanguage.checkBalance[userLanguage] || buttonsNameFromLanguage.checkBalance['en'], callback_data: "checkBalanceAction" },
        ],
        [
            { text: buttonsNameFromLanguage.back[userLanguage] || buttonsNameFromLanguage.back['en'], callback_data: "goBack" }, // Кнопка для возврата на основную клавиатуру
        ],
    ],
});

// Клавиатура для налива воды
const pourWaterKeyboard = (userLanguage) => ({
    inline_keyboard: buttonsNameFromLanguage.waterOptions[userLanguage].map(option => [{ text: option, callback_data: option }])
});

module.exports = { mainKeyboard, balanceKeyboard };