const raw = require('../data');

const parseData = (raw) => {
    const lines = raw.split('\n');
    return lines.reduce((acc, line) => {
        //tknk (41) -> ugml, padx, fwft
        const [nameweight, children] = line.split(' -> ');
        const [name, weight] = nameweight.split(' ');
        const childrenNames = children ? children.split(', ') : [];
        acc[name] = {
            name,
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

const getNodeWeight = (node) => {
    if (node.children.length === 0) {
        return node.weight;
    }
    return node.children.reduce((acc, child) => {
        return acc + getNodeWeight(child);
    }, node.weight);

}

const findUnbalancedChild = (node) => {
    if (!node.children || node.children.length === 0) {
        return null;
    }
    const childWeights = node.children.map(child => {
        return { name: child.name, weight: getNodeWeight(child) };
    });
    const unbalancedChild = childWeights.find(child => {
        return childWeights.filter(c => c.weight === child.weight).length === 1;
    });
    return unbalancedChild;
}

const seekTheUnbalancedChild = (node) => {
    let unbalancedChild = node;
    let lastUnbalancedChildName = null;
    while (unbalancedChild !== null && unbalancedChild !== undefined) {
        lastUnbalancedChildName = unbalancedChild.name;
        unbalancedChild = findUnbalancedChild(tree[lastUnbalancedChildName]);
    }
    return lastUnbalancedChildName;
}
const data = parseData(raw);
const tree = buildTree(data);
const root = tree[Object.keys(tree).filter(name => {
    return tree[name].parent === null;
})[0]];
console.log(seekTheUnbalancedChild(root));
tree['drjmjug'].children.forEach(child => {
    console.log(getNodeWeight(child), child.name);
})
console.log(tree['drjmjug']);
// tree['hmgrlpj'].children.forEach(child => {
//     console.log(getNodeWeight(child), child.name);
// })

// 5 * 330 = 1650
// 2078 - 1650 = 2038