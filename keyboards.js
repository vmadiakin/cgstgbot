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
    waterOptions1liter: {
        'ru': '1 литр',
        'en': '1 liter',
        'tr': '1 litre'
    },
    waterOptions5liters: {
        'ru': '5 литров',
        'en': '5 liters',
        'tr': '5 litre'
    },
    waterOptions19liters: {
        'ru': '19 литров',
        'en': '19 liters',
        'tr': '19 litre'
    },
    waterOptionsOtherQuantity: {
        'ru': 'Другое количество',
        'en': 'Other quantity',
        'tr': 'Diğer miktar'
    },
    waterOptionsOzoneSettings: {
        'ru': 'Настройки озона',
        'en': 'Ozone settings',
        'tr': 'Ozon ayarları'
    },
    waterOptionsWaterMachineSelection: {
        'ru': 'Выбор водомата',
        'en': 'Water machine selection',
        'tr': 'Su makinesi seçimi'
    },
    referralRules: {
        'ru': 'Правила программы',
        'en': 'Program Rules',
        'tr': 'Program Kuralları'
    },
    referralInviteLink: {
        'ru': 'Ссылка для приглашения',
        'en': 'Invite link',
        'tr': 'Bağlantıyı davet et'
    },
    referralStatistics: {
        'ru': 'Статистика',
        'en': 'Statistics',
        'tr': 'İstatistik'
    },
    supportProblem: {
        'ru': 'Сообщить о проблеме',
        'en': 'Report a problem',
        'tr': 'Problemi şikayet et'
    },
    supportCooperation: {
        'ru': 'Сотрудничество',
        'en': 'Cooperation',
        'tr': 'İşbirliği'
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
            { text: buttonsNameFromLanguage.back[userLanguage] || buttonsNameFromLanguage.back['en'], callback_data: "goBack" },
        ],
    ],
});

// Клавиатура для налива воды
const pourWaterKeyboard = (userLanguage, userOzoneSetting, userWaterMachineSelection) => ({
    inline_keyboard: [
        [
            { text: buttonsNameFromLanguage.waterOptions1liter[userLanguage] || buttonsNameFromLanguage.waterOptions1liter['en'], callback_data: "pourWater_1liter" },
            { text: buttonsNameFromLanguage.waterOptionsOtherQuantity[userLanguage] || buttonsNameFromLanguage.waterOptionsOtherQuantity['en'], callback_data: "pourWater_otherQuantity" },
        ],
        [
            { text: buttonsNameFromLanguage.waterOptions5liters[userLanguage] || buttonsNameFromLanguage.waterOptions5liters['en'], callback_data: "pourWater_5liters" },
            { text: `${buttonsNameFromLanguage.waterOptionsOzoneSettings[userLanguage] || buttonsNameFromLanguage.waterOptionsOzoneSettings['en']} ${userOzoneSetting ? '🟢' : '🔴'}`, callback_data: "pourWater_ozoneSettings" },

        ],
        [
            { text: buttonsNameFromLanguage.waterOptions19liters[userLanguage] || buttonsNameFromLanguage.waterOptions19liters['en'], callback_data: "pourWater_19liters" },
            { text: `${buttonsNameFromLanguage.waterOptionsWaterMachineSelection[userLanguage] || buttonsNameFromLanguage.waterOptionsWaterMachineSelection['en']} ${userWaterMachineSelection ? '🟢' : '🔴'}`, callback_data: "pourWater_machineSelection" },
        ],
        [
            { text: buttonsNameFromLanguage.back[userLanguage] || buttonsNameFromLanguage.back['en'], callback_data: "goBack" }, // Кнопка для возврата на основную клавиатуру
        ],
    ],
});

// Клавиатура для реферальной программы
const referralKeyboard = (userLanguage) => ({
    inline_keyboard: [
        [
            { text: buttonsNameFromLanguage.referralRules[userLanguage] || buttonsNameFromLanguage.referralRules['en'], callback_data: "referralRules" },
            { text: buttonsNameFromLanguage.referralInviteLink[userLanguage] || buttonsNameFromLanguage.referralInviteLink['en'], callback_data: "referralInviteLink" },
            { text: buttonsNameFromLanguage.referralStatistics[userLanguage] || buttonsNameFromLanguage.referralStatistics['en'], callback_data: "referralStatistics" },
        ],
        [
            { text: buttonsNameFromLanguage.back[userLanguage] || buttonsNameFromLanguage.back['en'], callback_data: "goBack" },
        ],
    ],
});

// Клавиатура для реферальной программы
const supportKeyboard = (userLanguage) => ({
    inline_keyboard: [
        [
            { text: buttonsNameFromLanguage.supportProblem[userLanguage] || buttonsNameFromLanguage.supportProblem['en'], callback_data: "supportProblem" },
            { text: buttonsNameFromLanguage.supportCooperation[userLanguage] || buttonsNameFromLanguage.supportCooperation['en'], web_app: {url: 'https://premier.one/'}},
        ],
        [
            { text: buttonsNameFromLanguage.back[userLanguage] || buttonsNameFromLanguage.back['en'], callback_data: "goBack" },
        ],
    ],
});

module.exports = { mainKeyboard, balanceKeyboard, pourWaterKeyboard, referralKeyboard, supportKeyboard };
