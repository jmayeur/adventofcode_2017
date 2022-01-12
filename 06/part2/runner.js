const raw = require('../data');

const parseData = (raw) => {
    return raw.split('\t').map(v => parseInt(v));
};

const getBigBlockIndex = (blocks) => {
    return blocks.findIndex(v => v === Math.max(...blocks));
}

const doRedistribute = (blocks, pickIndex) => {
    let block = blocks[pickIndex];
    blocks[pickIndex] = 0;
    let i = pickIndex + 1;
    while(block > 0) {
        i = i % blocks.length;
        blocks[i]++;
        block--;
        i++;
    }
    return blocks;
}

const loopUntilMatch = (blocks) => {
    const seen = {};
    
    let steps = 0;
    seen[blocks.join(',')] = steps;
    while(true) {
        const index = getBigBlockIndex(blocks);
        blocks = doRedistribute(blocks, index);
        steps++;
        const key = blocks.join(',');
        if (seen[key]) {
            return steps - seen[key];
        }
        seen[key] = steps;
    }
}

const blocks = parseData(raw);
console.log(loopUntilMatch(blocks));