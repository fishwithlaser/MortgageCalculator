/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. */

module.exports = function (controller) {

    controller.hears(/mortgage/, ['message', 'direct_message'], async function (bot, message) {
        // parses message for variables
        const matches = message.text.match(/[-+]?[0-9]*\.?[0-9]+/g) // regex match extracts ints and floats
        let numbers
        if (matches) {
            numbers = matches.map(match => Number.parseFloat(match))
        }

        let response_message

        if (!numbers || numbers.length < 3) {
            response_message = "Please provide a price (e.g., 500000), interest (e.g., 0.03) and a term in years (e.g., 30)."
        } else {
            const price = numbers[0]
            const interest = numbers[1] // 1% should be represented as 0.01
            const term = numbers[2] 

            // does math for mortgage - assumes 3.00 interest on 30 year loan
            let monthly_payment = price / (1/interest - 1/(interest*(1+interest)**term)) / 12
            monthly_payment = Math.round(monthly_payment)

            response_message = `Your montly payment based on\nprice: ${price}\ninterest: ${interest}\n term: ${term}\n is *${monthly_payment}* per month`
        }
        //format block kit
        const blockKitReply = {
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": response_message
                    }
                }
            ]
        }

        await bot.reply(message, blockKitReply)
    });

}