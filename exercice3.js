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

function getRandomWordFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

async function checkHashMatch(tab, numEssais) {
    let compteur = 0;
    let essais = 0;

    while (essais < numEssais) {
        essais++;
        const word1 = getRandomWordFromArray(tab);
        const word2 = getRandomWordFromArray(tab);
        const hash1 = await hashMessage(word1);
        const hash2 = await hashMessage(word2);

        if (hash1 === hash2) {
            compteur++;
            console.log(`Match trouvé: ${word1} et ${word2} avec hachage ${hash1}`);
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
];

const numEssais = 100; // Nombre d'essais à effectuer

// Appel de la fonction et affichage des résultats
checkHashMatch(words, numEssais).then(({ compteur, essais }) => {
    console.log(`Nombre de correspondances trouvées: ${compteur}`);
    console.log(`Nombre d'essais: ${essais}`);
});