const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

exports.repeat = functions.https.onRequest(async (req, res)=>{
    let text = req.query.text;

    // Log request
    functions.logger.info(`REPEAT: ${text}`);

    res.json({
        result: text.toUpperCase()
    })
});

/*
Receive:
    ipsumNumParagraphs
    ipsumLength
    excludeIpsum
    startWithOy

Do:
    Random generate paragraphs
        Pull from list of phrases and words.
        Create sentences with punctuation.
        Mix in some Ipsum, if requested.
    Ensure paragraph ends on word with punctuation

Respond:
    Array of paragraph strings
*/

