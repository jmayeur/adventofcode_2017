const raw = require('../data');

const parseData = (raw) => {
    const lines = raw.split('\n');
    return lines.map(line => {
        return line.split('\t').map(Number);
    });
};

const getChecksum = (sheet) => {
    return sheet.reduce((acc, row) => {
        return acc + Math.max(...row) - Math.min(...row);
    }, 0);
}

const sheet = parseData(raw);
const checkSum = getChecksum(sheet);
console.log(checkSum);