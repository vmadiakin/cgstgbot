const mainKeyboard = {
    inline_keyboard: [
        [
            { text: "Налить воду", callback_data: "pour_water" },
            { text: "Баланс", callback_data: "check_balance" },
        ],
        [
            { text: "Реферальная программа", callback_data: "referral_program" },
            { text: "Поддержка", callback_data: "support" },
        ],
    ],
};

module.exports = {mainKeyboard}