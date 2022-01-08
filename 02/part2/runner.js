const raw = require('../data');

const parseData = (raw) => {
    const lines = raw.split('\n');
    return lines.map(line => {
        return line.split('\t').map(Number);
    });
};

const getEvenDivisors = (sheet) => {
    return sheet.reduce((acc, row) => {
        return acc + row.reduce((_acc, num) => {
            const divisors = row.filter(n => n !== num && n % num === 0);

            if (divisors.length > 0) {
                return _acc + divisors[0] / num;
            }
            return _acc;
        }, 0);
    }, 0);
};


const sheet = parseData(raw);
const result = getEvenDivisors(sheet);
console.log(result);
