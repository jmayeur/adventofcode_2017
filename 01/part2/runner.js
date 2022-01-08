const raw = require('../data');

const parseData = (raw) => {
    return raw.split('').map(v => parseInt(v));
};

const sumCousins = (numbers) =>{
    const len = numbers.length;
    return numbers.reduce((acc, curr, i) => {
        const cousinIndex = (i + len/2) % len;
        return curr === numbers[cousinIndex] ? acc + curr : acc;
    }, 0);
}

const numbers = parseData(raw.data);
const cuzSum= sumCousins(numbers);
console.log({cuzSum});