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
    princify: price => price.toFixed(2)
};

module.exports = {handlebarsHelpers,}