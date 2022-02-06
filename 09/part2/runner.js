const raw = require('../data');

const parseData = (raw) => {
    return raw.split('');
};


const countGroups = (data) => {
    let inGarbage = false;
    let cancelNext = false;
    let garbageCount = 0;
    data.forEach(char => {

        if (cancelNext) {
            cancelNext = false;
            return;
        }

        if (char === '!') {
            cancelNext = true;
            return;
        }

        if (char === '<' && !inGarbage) {
            inGarbage = true;
            return;
        }

        if (char === '>') {
            inGarbage = false;
            return;
        }

        if (inGarbage) {
            garbageCount++;
            return;
        }
    });

    return garbageCount;
};

const data = parseData(raw);
console.log(countGroups(data))