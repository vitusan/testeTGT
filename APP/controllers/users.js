const User = require('../models/user');

module.exports.login = async (req, res) => {
    const user = new User(req.body.user);
    if (await User.exists({ username: user.username, password: user.password })){
        res.render('users/home');
    } else {
        let credentials = await User.findOne({})
        res.render('unauthorized', { credentials });
    }
}

module.exports.renderHome = (req, res) => {
    res.render('users/home');
}
