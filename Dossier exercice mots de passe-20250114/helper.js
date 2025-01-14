const str_reverse = function(s) {
    return s.split("").reverse().join("");
};


let int2array_int = function(n, b, l) {
    let m = n;
    s = [];
    if (m==0) {s = [0];}
    while (m != 0) {
	q = Math.floor(m/b);
	r = m % b;
	s.push(r.toString());
	m = q;
    }
    if (s.length < l) {
	for (let i = 0; i < l - s.length; i++)
	    s.push('0');
    }
    s.reverse();
    return s;
};


let int2str_alphabet = function(n, l) {
    let b = 26;
    let s = int2array_int(n, b, l);
    let S = "";
    for (c of s) {
	S += String.fromCharCode(parseInt(c,10)+97);
    }
    return S;
};


let int2str_ascii = function(n, l) {
    let b = 95;
    let s = int2array_int(n, b, l);
    let S = "";
    for (c of s) {
	S += String.fromCharCode(parseInt(c,10)+32);
    }
    return S;
};



