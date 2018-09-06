module.exports = (api) => {
    api.actions = {
        movies:  require('./movies/crud')(api),
        genres:  require('./genres/crud')(api),
        meetings: require('./meetings/crud')(api)
    };
};