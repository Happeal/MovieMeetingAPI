module.exports = (api) => {
    api.use('/movies', require('./movies')(api));
    api.use('/genres', require('./genres')(api));
};