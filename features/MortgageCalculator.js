/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. */

module.exports = function (controller) {

    controller.hears(/mortgage/, ['message', 'direct_message'], async function (bot, message) {
        console.log(message)

        // parses message for variables
        const numbers = message.incoming_message.match(/[-+]?[0-9]*\.?[0-9]+/g) // regex match extracts ints and floats
            .forEach(match => Number.parseFloat(match))

        let response_message;

        if (numbers.length < 3) {
            response_message = "Please provide a price (e.g., 500000), interest (e.g., 0.03) and a term in years (e.g., 30)."
        } else {
            const price = numbers[0]
            const interest = numbers[1] // 1% should be represented as 0.01
            const term = numbers[2] 

            // does math for mortgage - assumes 3.00 interest on 30 year loan
            const monthly_payment = price / (1/interest - 1/(interest*(1+interest)**term)) / 12

            response_message = "Your montly payment based on\n price: " + price + "\n interest: "
                + interest + "\n term: " + term + "\n is <b>" + monthly_payment + "</b> per month"
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

        await bot.reply(message, blockKitReply);
    });

}