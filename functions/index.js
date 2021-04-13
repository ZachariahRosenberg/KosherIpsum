const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

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

const mock_ipsum_text = [
    `Chupa chups dragée marshmallow tart dragée powder cotton candy marzipan pastry. 
    Lemon drops bear claw dragée oat cake chocolate bar liquorice ice cream tart soufflé. 
    Pastry oat cake lemon drops candy canes tart cotton candy carrot cake toffee bonbon. 
    Candy canes macaroon soufflé danish lemon drops chupa chups biscuit. Marshmallow 
    apple pie pastry sesame snaps tart dragée halvah. Dessert brownie cupcake candy 
    canes cake cake. Danish toffee donut jelly pie. Cotton candy muffin icing brownie. 
    Carrot cake icing sweet roll jelly beans gingerbread sweet pie cotton candy dessert. 
    Chocolate bonbon apple pie biscuit chocolate jujubes gummies. Halvah jujubes donut 
    biscuit cotton candy caramels ice cream lemon drops. Oat cake apple pie macaroon 
    croissant caramels cotton candy.`,
    `Bonbon candy canes gingerbread cake dragée sugar plum pudding biscuit. Bonbon cake 
    wafer marzipan dessert liquorice pastry apple pie cupcake. Macaroon oat cake sugar 
    plum muffin caramels gummies oat cake candy. Tart cheesecake toffee pudding bear claw 
    cheesecake apple pie cheesecake. Bear claw bonbon tart ice cream candy cupcake. Muffin 
    powder cupcake macaroon marzipan tart. Oat cake fruitcake powder candy danish. Topping 
    cake oat cake brownie muffin marshmallow. Halvah cheesecake caramels macaroon sesame 
    snaps sweet roll croissant tootsie roll gingerbread. Jelly beans soufflé topping. 
    Pastry gingerbread sweet roll cotton candy lollipop chocolate cake. Sweet roll dragée 
    cotton candy liquorice gingerbread sweet roll cotton candy toffee. Candy canes gummies 
    jelly marshmallow bonbon biscuit.`,
    `Tart sesame snaps bonbon cheesecake bear claw caramels. Dessert jelly beans chocolate bar. 
    Bonbon ice cream cupcake lollipop apple pie chupa chups dessert. Sweet cupcake tootsie roll 
    fruitcake croissant. Sweet jujubes toffee gummies pie. Gummies lemon drops soufflé. Chupa 
    chups pie fruitcake. Marzipan biscuit icing cookie jujubes icing. Sesame snaps cookie sesame 
    snaps chocolate cake wafer macaroon powder. Liquorice muffin tootsie roll topping cupcake. 
    Chocolate gummies topping soufflé pudding fruitcake cupcake jelly. Dragée sesame snaps topping 
    cookie pastry cheesecake. Jelly-o chocolate cake cake powder bear claw chocolate.`,
    `Jelly halvah carrot cake chocolate bar muffin dessert liquorice bonbon. Topping candy chocolate 
    cake cotton candy topping. Sweet roll donut halvah marzipan sweet. Dessert cotton candy jelly-o 
    sweet roll lemon drops gummi bears. Pastry ice cream I love. Fruitcake cheesecake candy canes 
    cake candy canes pastry cotton candy sweet macaroon. Gummies muffin pudding wafer marshmallow 
    sweet muffin. I love gummi bears marshmallow sugar plum dessert. Apple pie chocolate cake jujubes 
    biscuit. Oat cake topping marzipan sweet. Cookie cheesecake cake candy canes powder I love muffin 
    halvah. Tootsie roll chocolate tootsie roll pie carrot cake pie I love lemon drops cake. Jelly 
    tootsie roll sweet I love chocolate oat cake.`,
    `Chupa chups dragée chocolate gummi bears tiramisu chupa chups. Lollipop brownie jujubes candy canes 
    liquorice jelly beans lollipop chocolate jelly beans. Topping fruitcake chocolate bar pastry oat cake 
    chocolate bar toffee. I love pastry chupa chups. Lemon drops liquorice caramels. Lollipop marshmallow 
    lemon drops bear claw liquorice tart. Wafer bear claw liquorice icing. Gummi bears carrot cake sugar 
    plum chocolate liquorice I love halvah donut soufflé. Gummi bears gingerbread sesame snaps. I love 
    lemon drops caramels wafer pastry caramels I love apple pie. Cupcake chocolate tart pie pastry 
    croissant. Candy icing caramels muffin cheesecake.`
]

/* Thank you to
https://jewishorangeny.org/jewish-life/wao-weekly-e-blast-news-articles/my-yiddishe-momma-told-meand-other-yiddish-expressions
https://www.refinery29.com/en-us/yiddish-words-phrases-meaning-dictionary
https://www.dailywritingtips.com/the-yiddish-handbook-40-words-you-should-know/
https://bestlifeonline.com/yiddish-words/

*/

const yiddish_phrases = [
    "You could just kvell",
    "Bubbe",
    "Bupkis",
    "Chutzpah",
    "Goyische",
    "Kiss your keppie",
    "act like a klutz!",
    "She's always kvelling over that ",
    "Stop your kvetching already",
    "Ok fine, Mazal Tov",
    "but a total mensche",
    "Have you gone Mesugganeh?",
    "But what is this meshugas?",
    "He isn't yet Mishpocheh",
    "Here, have some nosh",
    "oy vey ist mir",
    "I could plotz",
    "Schmutz",
    "oy, what a schlep",
    "looks like a schmatte",
    "Shmendrik",
    "Yankel is such a shmoozer",
    "schmooze",
    "I'm schvitzin over here!",
    "Quit your schvitzin!",
    "Shtick",
    "I'm on to your schtick",
    "So nu, what was the shpiel",
    "Tachlis",
    "He sells some tchotchke",
    "Move your tuches",
    "Kishke",
    "Verklempt",
    "Say hello to your Zayde - speak louder.",
    "Just a bissell of",
    "you have such chutzpah",
    "Feh!",
    "a bissel gornisht helfn",
    "like some kibbitz",
    "Kosher",
    "Kibbitz",
    "nu",
    "Oy!",
    "Oy Vey!",
    "eat like a shlemiel",
    "look like schlock",
    "So shmaltzy",
    "Schmuck!",
    "Shikse",
    "yente",
    "yiddisher kop",
    "now just an alterkaker",
    "L’chaim",
    "Der mentsh trakht un got lakht.",
    "use some seichel",
    "ketzeleh",
    "zisskeit",
    "Gay kaken ofn yahm!",
    "hocking me a chainik",
    "schmegeggie",
    "little pischer",
    "nebuch",
    "nebbish",
    "a total chazer",
    "faygeleh",
    "A klug zu",
    "ferschtunkeneh",
    "ferschvitz",
    "ferschlept",
    "What a ferschluggineh idea",
    "a ferschtunkeneh story",
    "a ferkakte dinner",
    "Spare me that whole ferschlepte krenk",
    "bubbe meise",
    "Alev ha sholem",
    "Kinna Horah",
    "Stop potchkeying around",
    "a tuchis and a half",
    "closet full of schmattas",
    "brings much nachas",
    "schtarker",
    "kockleffel",
    "schmeikeler",
    "quite a meezkeit",
    "kvetch about the tzuris",
    "gehakte tzuris",
    "Schtup the bellboy something",
    "chazerei",
    "yahrzeit",
    "needs a shidduch",
    "oy gevalt",
    "guttenyu",
    "tuna bagel",
    "bagel with schmear",
    "rugelech",
    "Gesundheit",
    "Sei gesund",
    "A bi gesunt",
    "Shayna Punim",
    "Eizeh balegan!",
    "tachlis",
    "Mishpacha",
    "Ima",
    "Abba",
    "Savta",
    "Saba",
    "baleboste",
    "drek",
    "knadle",
    "kolboynick",
    "shagetz",
    "kocke putzi",
    "kokh lefel",
    "Borekh habo",
    "Vi geyt es?",
    "Ikh hab dikh lang nisht gezen",
    "Zalst zeyn mitslikh",
    "Zalst habn mazel",
    "A gliklekhe rayze",
    "Ikh farshtey nisht",
    "Shkoyekh",
    "Nishto farvos",
    "Das man vet far ales batsaln",
    "Ikh hab dikh lib",
    "Gey avek fun mir!",
    "A freylekhn geburtstag",
    "Baalas Teshuva",
    "Blech",
    "B'tayavon",
    "Bubby",
    "Try the Chulent",
    "such a potchke",
    "Shlissel",
    "Shtetl",
    "not my shtick",
    "at shul",
    "shabbos",
    "Sufganiot",
    "has no tam",
    "Yesshiva",
    "Gut Yuntif"
]

exports.generateIpsum = functions.https.onRequest(async (req, res)=>{

    let ipsumNumParagraphs = req.query.ipsumNumParagraphs || 3;
    let ipsumLength        = req.query.ipsumLength || 'l';
    let excludeIpsum       = Boolean(req.query.excludeIpsum) || true;
    let startWithOy        = Boolean(req.query.startWithOy) || true;

    // Log request
    functions.logger.info(
        `Generate: ${ipsumNumParagraphs} ps of ${ipsumLength} length. 
        Do we want ipsum? ${excludeIpsum}
        Start with an Oy? ${startWithOy}`
    );

    // Mocked for now. this should be handled on the server side
    // This will just cut a word off in the middle. 
    // On server side code, we should ensure we keep the last word and punctuation!

    let paragraphSizes = {
        s: 250,
        m: 420,
        l: 730
    }

    let paragraphs = mock_ipsum_text
        .slice(0, ipsumNumParagraphs)
        .map(p=>{
            return p.split('').slice(0, paragraphSizes[ipsumLength]).join('');
        });

    if(startWithOy){
        paragraphs[0] = 'Oy Gevalt! ' + paragraphs[0];
    }

    res.json({
        result: paragraphs
    })
});