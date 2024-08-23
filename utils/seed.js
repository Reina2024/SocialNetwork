const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  
  const seedData = async () => {
    try {
      // Remove existing data 
      await User.deleteMany({});
      await Thought.deleteMany({});
  
      // Seed users with more diverse names
      let users = await User.create([
        { username: 'AliceWonders', email: 'alice.wonders@example.com' },
        { username: 'BobTheBuilder', email: 'bob.builder@example.com' },
        { username: 'CharlieChops', email: 'charlie.chops@example.com' },
        { username: 'DianaDreams', email: 'diana.dreams@example.com' },
        { username: 'EveTheExplorer', email: 'eve.explorer@example.com' },
      ]);

      // Seed thoughts with more engaging content and diverse reactions
      const thoughts = await Thought.create([
        { username: users[0].username, thoughtText: 'Exploring the wonders of the universe!', reactions: [
          { reactionBody: 'Absolutely fascinating!', username: users[1].username },
          { reactionBody: 'Can you share more details?', username: users[2].username }
        ]},
        { username: users[1].username, thoughtText: 'Building dreams, one step at a time.', reactions: [
          { reactionBody: 'You’re a true inspiration!', username: users[2].username },
          { reactionBody: 'Keep up the great work!', username: users[3].username }
        ]},
        { username: users[2].username, thoughtText: 'Chopping away at life’s challenges.', reactions: [
          { reactionBody: 'Stay strong, friend!', username: users[3].username },
          { reactionBody: 'You’ve got this!', username: users[4].username }
        ]},
        { username: users[3].username, thoughtText: 'Dreams are the seeds of reality.', reactions: [
          { reactionBody: 'Such a profound thought!', username: users[0].username },
          { reactionBody: 'I feel motivated!', username: users[1].username }
        ]},
        { username: users[4].username, thoughtText: 'Exploring the unknown with excitement.', reactions: [
          { reactionBody: 'Adventure awaits!', username: users[0].username },
          { reactionBody: 'Sounds thrilling!', username: users[2].username }
        ]},
        { username: users[0].username, thoughtText: 'What’s next on the horizon?', reactions: [
          { reactionBody: 'Can’t wait to find out!', username: users[1].username },
          { reactionBody: 'Let’s discover together!', username: users[4].username }
        ]},
        { username: users[1].username, thoughtText: 'Every challenge is a new opportunity.', reactions: [
          { reactionBody: 'True words!', username: users[2].username },
          { reactionBody: 'Embrace the challenges!', username: users[3].username }
        ]},
        { username: users[2].username, thoughtText: 'Life is a series of learning moments.', reactions: [
          { reactionBody: 'Wise words!', username: users[3].username },
          { reactionBody: 'Learning is key!', username: users[4].username }
        ]},
        { username: users[3].username, thoughtText: 'Dream big, achieve bigger.', reactions: [
          { reactionBody: 'Inspiring!', username: users[0].username },
          { reactionBody: 'Keep reaching for the stars!', username: users[1].username }
        ]},
        { username: users[4].username, thoughtText: 'Embrace every moment of the journey.', reactions: [
          { reactionBody: 'Beautiful sentiment!', username: users[2].username },
          { reactionBody: 'Life is a journey!', username: users[3].username }
        ]},
      ]);

      thoughts.forEach(async (thought) => {
        await User.findOneAndUpdate({ username: thought.username }, { $addToSet: { thoughts: thought._id } });
      });
      
      users = await User.find();
  
      console.table(users);
      console.table(thoughts);
      console.log('Seed data created successfully!');
    } catch (err) {
      console.error('Error seeding data:', err);
    }
  };

  await seedData();
  process.exit(0);
});
