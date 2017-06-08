const Chance = require('chance');
var chance = new Chance();

exports.schema = function () {
    let parent = {}
    parent.users = createUsers(3, 7);

    return parent;
}

function createUsers(low, high) {
    let items = {};

    const generatedItems = randomIntInc(low, high);
    for (let i = 0; i < generatedItems; i++) {
        const item = {}
        item.uid = chance.guid();
        item.email = chance.email();
        item.profileImageUrl = chance.avatar();
        item.username = chance.name();

        const parent = {}
        parent[item.uid] = item
        Object.assign(items, parent)
    }

    return items;
}

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}