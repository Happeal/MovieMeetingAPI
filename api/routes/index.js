module.exports = (api) => {
    api.use('/movies', require('./movies')(api));
};