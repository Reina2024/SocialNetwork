const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const names = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hannah', 'Ian', 'Jack',
  'Karen', 'Louis', 'Mona', 'Nina', 'Oscar', 'Paul', 'Quincy', 'Rachel', 'Steve', 'Tina'
];

const appThoughts = [
  'Great job!', 'Well done!', 'Keep it up!', 'Amazing effort!', 'You can do it!',
  'Fantastic!', 'Incredible!', 'Outstanding!', 'Impressive!', 'Brilliant!'
];

const getRandomName = () => `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionName: getRandomArrItem(appThoughts),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

module.exports = { getRandomName, getRandomReactions };
