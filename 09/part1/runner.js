const raw = require('../data');

const parseData = (raw) => {
    return raw.split('');
};


const countGroups = (data) => {
    let inGarbage = false;
    let depth = 0;
    let cancelNext = false;
    let count = 0;
    data.forEach(char => {
 
        if (cancelNext) {
            cancelNext = false;
            return;
        }

        if (char === '!') {
            cancelNext = true;
            return;
        }

        if (char === '<') {
            inGarbage = true;
            return;
        }

        if (char === '>') {
            inGarbage = false;
            return;
        }

        if (inGarbage) {
            return;
        }

        if (char === '{') {
            depth++;
            return;
        }

        if (char === '}') {
            count += 1 * depth;
            depth--;
            return;
        }  
    });

    return count;
};

const data = parseData(raw);
console.log(countGroups(data))