module.exports = (api) => {
    api.actions = {
        movies:  require('./movies/crud')(api),
    };
};