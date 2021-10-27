const handlebarsHelpers = {
    findPrice: (entries, selectedItem) => {
        const found = entries.find(el => el[0] === selectedItem);

        if (!found) {
            throw new Error(`Cannot find price of "${selectedItem}"`)
        }

        const [, price] = found;
        return price;
    },
    upper: str => str.toUpperCase(),
    princify: price => price.toFixed(2),
    isNotInArray: (arr,element)=> !arr.includes(element),
    isInArray: (arr,element)=> arr.includes(element),
};

module.exports = {handlebarsHelpers,}