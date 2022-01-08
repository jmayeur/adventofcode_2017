const raw = require('../data');

const parseData = (raw) => {
    return raw.split('').map(v => parseInt(v));
};

const sumSiblings = (numbers) =>{
    return numbers.reduce((acc, curr, i) => {
        if (i < numbers.length - 1){
            return curr === numbers[i+1] ? acc + curr : acc;
        } else {
            return curr === numbers[0] ? acc + curr : acc;
        }
        
    }, 0);
}

const numbers = parseData(raw.data);
const sibSum= sumSiblings(numbers);
console.log({sibSum});