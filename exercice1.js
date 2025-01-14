async function hashMessage(message) {

    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // return hashHex;
    return hashHex.slice(0, 5);
}

// Exemple d'utilisation
hashMessage("mathismicheau").then(hash => {
    console.log(hash); 
});