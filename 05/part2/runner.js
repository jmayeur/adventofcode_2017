const raw = require('../data');

const parseData = (raw) => {
    return raw.split('\n').map(v => parseInt(v));
};

const escape = (jumps) => {
    let i = 0;
    let steps = 0;
    while (i < jumps.length && i >= 0) {
        const jump = jumps[i];
        if (jump >= 3) {
            jumps[i] = jump - 1;
        } else {
            jumps[i] = jump + 1;
        }
        i += jump;
        steps++;
    }
    return steps;
};

const jumps = parseData(raw);
console.log(escape(jumps));