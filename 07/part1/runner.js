const raw = require('../data');

const parseData = (raw) => {
    const lines = raw.split('\n');
    return lines.reduce((acc, line) => {
        //tknk (41) -> ugml, padx, fwft
        const [nameweight, children] = line.split(' -> ');
        const [name, weight] = nameweight.split(' ');
        const childrenNames = children ? children.split(', ') : [];
        acc[name] = {
            weight: parseInt(weight.replace('(', '').replace(')', '')),
            childrenNames
        };
        return acc;
    }, {});
};

const buildTree = (data) => {
    Object.keys(data).forEach(name => {
        const node = data[name];
        node.children = node.children || [];
        node.parent = node.parent || null;
        if (node.childrenNames) {
            node.childrenNames.forEach(childName => {
                const child = data[childName];
                child.parent = node;
                node.children.push(child);
            });     
        }
    });
    return data;
};

const data = parseData(raw);
const tree = buildTree(data);
console.log(Object.keys(tree).filter(name => {
    return tree[name].parent === null;
}));

//console.log(tree['tqyte'])
//console.log(tree['byhatd'])