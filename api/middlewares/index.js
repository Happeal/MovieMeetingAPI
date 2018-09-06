module.exports = (api) => {
    api.middlewares = {
        bodyParser: require('body-parser'),
        syncData: require('./syncData')(api)
    };
};
