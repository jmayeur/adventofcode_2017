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
    let highest = Number.MIN_VALUE;
    ops.forEach(op => {
        const check_reg_val = registers[op.check_reg] || 0;
        switch (op.comp) {
            case '>':
                if (check_reg_val > op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                    highest = Math.max(highest, registers[op.reg]);
                }
                break;
            case '<':
                if (check_reg_val < op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                    highest = Math.max(highest, registers[op.reg]);
                }
                break;
            case '>=':
                if (check_reg_val >= op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                    highest = Math.max(highest, registers[op.reg]);
                }
                break;
            case '<=':
                if (check_reg_val <= op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                    highest = Math.max(highest, registers[op.reg]);
                }
                break;
            case '==':
                if (check_reg_val === op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                    highest = Math.max(highest, registers[op.reg]);
                }
                break;
            case '!=':
                if (check_reg_val !== op.check_val) {
                    doOp(registers, op.reg, op.op, op.val);
                    highest = Math.max(highest, registers[op.reg]);
                }
                break;
            default:
                throw new Error(`Unknown comparison ${op.comp}`);
        }
    });

    return highest;
}

const ops = parseData(raw);
const highest = processOps(ops);
console.log(highest);