// async function hashMessage(message) {

//     const encoder = new TextEncoder();
//     const data = encoder.encode(message);

//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);

//     const hashArray = Array.from(new Uint8Array(hashBuffer));

//     const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

//     // return hashHex;
//     return hashHex.slice(0, 2);
// }

async function hashMessage(message) { 
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    // Calcul du hachage SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = new Uint8Array(hashBuffer);

    // Convertir les 5 premiers bits en un entier
    let hashBits = 0;
    for (let i = 0; i < 1; i++) {  // Se limiter aux 5 premiers bits
        hashBits |= hashArray[i] << (8 * i);
    }

    // Extraire les 5 premiers bits
    const truncatedBits = hashBits >> 3;  // Décaler pour ne garder que les 5 premiers bits

    return truncatedBits.toString(2).padStart(5, '0'); // Retourner les 5 premiers bits sous forme binaire
}

// Exemple d'utilisation
hashMessage("example").then(hash => {
    console.log(hash); // Affichera les 5 premiers bits du hachage
});


async function checkHashMatch(message, tab) {
    let compteur = 0;
    let essais = 0;
    const messageHash = await hashMessage(message);

    for (let t of tab) {
        essais++;
        const hash = await hashMessage(t);
        if (hash === messageHash) {
            compteur++;
            console.log(`Match trouvé: ${message} avec hachage tronqué ${t}`);
        }
    }
    return { compteur, essais };
}


// Exemple d'utilisation
const words = [
    "a", "a-horizon", "a-ok", "aardvark", "aardwolf", "ab", "aba", "abaca", "abacist", "aback", "abactinal", "abacus", "abaddon", 
    "abaft", "abalienate", "abalienation", "abalone", "abampere", "abandon", "abandoned", "abandonment", "abarticulation", "abase", 
    "abased", "abasement", "abash", "abashed", "abashment", "abasia", "abasic", "abate", "abatement", "abating", "abatis", "abatjour", 
    "abattis", "abattoir", "abaxial", "abba", "abbacy", "abbatial", "abbatical", "abbatis", "abbe", "abbess", "abbey", "abbot", "abbreviate", 
    "abbreviated", "abbreviation", "abbreviature", "abc", "abcoulomb", "abdal", "abderite", "abdicable", "abdicant", "abdicate", "abdication", 
    "abdicator", "abditory", "abditos", "abdomen", "abdominal", "abdominocentesis", "abdominoscope", "abdominoscopy", "abdominous", 
    "abdominousness", "abdominovesical", "abduce", "abducent", "abduct", "abduction", "abductive", "abductor", "abeam", "abecedarian", 
    "abecedarius", "abecedary", "abed", "abel", "abelia", "abelmoschus", "abelmosk", "abends", "aber", "aberdeen", "aberdevine", "aberrance", 
    "aberrant", "aberration", "abest", "abet", "abetalipoproteinemia", "abetment", "abettor", "abeunt", "abeyance", "abeyant", "abfarad", 
    "abhenry", "abhor", "abhorrence", "abhorrent", "abhorrer", "abibis", "abidance", "abide", "abiding", "abidjan", "abience", "abient", 
    "abies", "abigail", "abiit", "abilities", "ability", "abiogenesis", "abiogenetic", "abiogenist", "abiotrophy", "abito", "abject", 
    "abjection", "abjectly", "abjectness", "abjunction", "abjuration", "abjurationabjurement", "abjure", "abkari", "ablactation", "ablated", 
    "ablation", "ablative", "ablaut", "ablaze", "ablaze(p)", "able", "ablebodied", "ablegate", "ableism", "ableness", "ablepharia", 
    "ablepsia", "ablepsy", "abloom", "ablude", "ablution", "ablutionary", "abnaki", "abnegation", "abnegator", "abnormal", "abnormality", 
    "abnormalize", "abnormally", "abnormis", "abnormity", "abnormous", "aboard", "abocclusion", "abode", "abodement", "aboding", "abohm", 
    "aboideau", "abois", "aboiteau", "abolengo", "abolish", "abolishable", "abolishment", "abolition", "abolitionary", "abolitionism", 
    "abolitionist", "abolitionize", "abomasal", "abomasum", "abominable", "abominate", "abomination", "abominator", "aborad", "aboral", 
    "abord", "aboriginal", "aborigine", "aborigines", "aborning", "abort", "aborticide", "abortifacient", "abortion", "abortionist", 
    "abortive", "abortively", "abortus", "abound", "abounding", "about", "about(p)", "about-face", "abouts", "above", "above-mentioned", 
    "aboveboard", "aboveground", "abovementioned", "abovesaid", "abovestairs", "abra", "abracadabra", "abrachia", "abrade", "abraded", 
    "abrader", "abraham", "abramis", "abranchiate", "abrasion", "abrasive", "abreast", "abrege", "abreption", "abridge", "abridged", 
    "abridger", "abridgment", "abroach", "abroad", "abrocoma", "abrocome", "abrogate", "abrogated", "abrogation", "abronia", "abrupt", 
    "abruption", "abruptly", "abruptness", "abruzzi", "abscess", "abscessed", "abscind", "abscision", "abscissa", "abscission", "abscond", 
    "absconder", "abscondment", "absence", "absens", "absent", "absentee", "absenteeism", "absently", "absentminded", "absentmindedness", 
    "absento", "absents", "absinth", "absinthe", "absit", "absitomen", "absolute", "absolutely", "absoluteness", "absolution", "absolutism",
    "absolutist", "absolve", "absolved", "absolver", "absolvitory", "absolvitur", "absonant", "absonous", "absorb", "absorbable", "absorbed",
    "absorbency", "absorbent", "absorber", "absorbing", "absorption", "absorptive", "absorptivity", "absquatulate", "abstain", "abstainer",
    "abstemious", "abstemiously", "abstention", "abstentionist", "abstentious", "absterge", "abstergent", "abstersion", "abstersive",
    "abstinence", "abstinent", "abstract", "abstracted", "abstractedly", "abstractedness", "abstraction", "abstractionism", "abstractionist",
    "abstractive", "abstractly", "abstractness", "abstractor", "abstruse", "abstrusely", "abstruseness", "abstrusion", "absume", "absumption",
];

checkHashMatch("example", words).then(({ compteur, essais }) => {
    console.log(`Nombre de correspondances trouvées: ${compteur}`);
    console.log(`Nombre d'essais: ${essais}`);
});
