const mongoose = require('mongoose');
const User = require('../models/user.js');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await User.deleteMany({});

    const user = new User({
        username: 'admin',
        password: 'admin',
    });

    await user.save();
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database seeded.');
});
