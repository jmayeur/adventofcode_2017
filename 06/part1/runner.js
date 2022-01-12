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
    let seen = [];
    let steps = 0;
    while(true) {
        const index = getBigBlockIndex(blocks);
        blocks = doRedistribute(blocks, index);
        steps++;
        if (seen.includes(blocks.join(','))) {
            return steps;
        }
        seen.push(blocks.join(','));
    }
}

const blocks = parseData(raw);
console.log(loopUntilMatch(blocks));