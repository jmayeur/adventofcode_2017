const raw = require('../data');

const parseData = (raw) => {
    const lines = raw.split('\n');
    return lines.map(line => line.split(' '));
};

const countValiedPassphrases = (passPhrases) => {
    return passPhrases.reduce((acc, passPhrase) => {
        const counts = passPhrase.reduce((_acc, word) => {
            _acc[word] = (_acc[word] || 0) + 1;
            return _acc;
        }, {})
        return acc + (Object.values(counts).filter(count => count > 1).length === 0 ? 1 : 0);
    }, 0);
};

const passPhrases = parseData(raw);
const valids = countValiedPassphrases(passPhrases);
console.log(valids);