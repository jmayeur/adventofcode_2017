const raw = require('../data');

const parseData = (raw) => {
    const lines = raw.split('\n');
    return lines.map(line => {
        const [reg_op_inc, condition] = line.split(' if ');
        const [reg, op, val] = reg_op_inc.split(' ');
        const [check_reg, comp, check_val] = condition.split(' ');

        return {
            reg,
            op,
            val: parseInt(val),
            check_reg,
            comp,
            check_val: parseInt(check_val)
        }
    });
};

const doOp = (registers, reg, op, val) => {
    if (registers[reg] === undefined) {
        registers[reg] = 0;
    }
    switch (op) {
        case 'inc':
            registers[reg] += val;
            break;
        case 'dec':
            registers[reg] -= val;
            break;
        default:
            throw new Error(`Unknown operation ${op}`);

    }
}

const processOps = (ops) => {
    const registers = {};
    ops.forEach(op => {
        const check_reg_val = registers[op.check_reg] || 0;
        switch (op.comp) {
            case '>':
                if (check_reg_val > op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                }
                break;
            case '<':
                if (check_reg_val < op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                }
                break;
            case '>=':
                if (check_reg_val >= op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                }
                break;
            case '<=':
                if (check_reg_val <= op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                }
                break;
            case '==':
                if (check_reg_val === op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                }
                break;
            case '!=':
                if (check_reg_val !== op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                }
                break;
            default:
                throw new Error(`Unknown comparison ${op.comp}`);
        }
    });

    return registers;
}

const ops = parseData(raw);
const registers = processOps(ops);
const max = Object.keys(registers).reduce((prev, curr) => {
    if (!prev) {
        return curr;
    }
    return registers[curr] > registers[prev] ? curr : prev;
}, false);
console.log(registers[max]);