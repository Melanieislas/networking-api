const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

const usersDatabase = require('./usersDatabase.json');
const thoughtsDatabase = require('./thoughtsDatabase.json');

connection.once('open', async () => {
    console.log('connected');
    //await User.deleteMany({});
    await Thought.deleteMany({});

    const thoughts = [];

   // await User.collection.insertMany(usersDatabase);
    await Thought.collection.insertMany(thoughtsDatabase);

});