const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomReactions } = require('./data');

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  console.log('connected');

  // Check if the 'thoughts' collection exists and drop it if it does
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  // Check if the 'users' collection exists and drop it if it does
  let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (usersCheck.length) {
    await connection.dropCollection('users');
  }

  // Generate 5 users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const reactions = getRandomReactions(1);

    const fullName = getRandomName();
    const [first, last] = fullName.split(' ');

    users.push({
      first,
      last,
      reactions,
    });
  }

  // Create users in the database
  const userData = await User.create(users);

  // Create a Thought document and link it to the created users
  const thoughts = [];
  for (let i = 0; i < 5; i++) {
    thoughts.push({
      thoughtText: getRandomName(), // Use a name as a placeholder for thought text
      inPerson: Math.random() > 0.5,
      users: [...userData.map(({ _id }) => _id)],
    });
  }

  await Thought.create(thoughts);

  // Log the created users and a success message
  console.table(users);
  console.info('Seed Data Created');
  
  // Exit the process
  process.exit(0);
});
