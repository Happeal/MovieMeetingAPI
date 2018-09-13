
module.exports = (api) => {

    const User = api.models.User;

    function connect(req, res, next) {
        let pseudo = req.body.pseudo;
        let pswd = req.body.password;
        if ((pseudo == null) || (pswd == null)) {
            return res.status(401).send("You have to provide pseudo and password.");
        }
        User.find({
            where: {
                pseudo: pseudo
            }
        }).then((user) => {
            if (user == null) {
                return res.status(401).send("No user known as " + pseudo);
            }
            if (user.encryptedPassword != pswd) { // TODO crypt password
                return res.status(401).send("Wrong password");
            }
            req.session.user = user;
            //console.log(req.session.user);
            return res.status(200).send("Welcome " + pseudo);
        });
    }

    return {
        connect
    };
};
