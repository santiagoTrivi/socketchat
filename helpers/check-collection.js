

const allowedCollections = (collection = '', collections = []) => {

    const isIncluded = collections.includes(collection);

    if(!isIncluded){
        throw new Error(`collection not allowed. try with  ${collections}`)
    }

    return true;
};

module.exports = {

    allowedCollections
};