const sampleUsers = [
    {
        userID: 1,
        username: 'test',
        type: 'Reviewer',
        password: 'test',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Test profile.'
    },
    {
        userID: 2,
        username: 'jane_smith',
        type: 'Owner',
        password: 'hashedpassword456',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Owner of a popular restaurant chain.'
    },
    {
        userID: 3,
        username: 'alice_wonder',
        type: 'Reviewer',
        password: 'hashedpassword789',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Food critic and travel blogger.'
    },
    {
        userID: 4,
        username: 'bob_builder',
        type: 'Owner',
        password: 'hashedpassword321',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
    },
    {
        userID: 5,
        username: 'charlie_brown',
        type: 'Reviewer',
        password: 'hashedpassword654',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Tech enthusiast and gadget reviewer.'
    },
    {
        userID: 6,
        username: 'daisy_duck',
        type: 'Reviewer',
        password: 'hashedpassword123',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Travel blogger and food critic.'
    },
    {
        userID: 7,
        username: 'edward_snow',
        type: 'Owner',
        password: 'hashedpassword234',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Cafe owner and barista trainer.'
    },
    {
        userID: 8,
        username: 'frank_underwood',
        type: 'Reviewer',
        password: 'hashedpassword345',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Political commentator and author.'
    },
    {
        userID: 9,
        username: 'george_orwell',
        type: 'Reviewer',
        password: 'hashedpassword456',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Literary critic and novelist.'
    },
    {
        userID: 10,
        username: 'harry_potter',
        type: 'Owner',
        password: 'hashedpassword567',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Owner of a magical bookstore.'
    },
    {
        userID: 11,
        username: 'ian_fleming',
        type: 'Reviewer',
        password: 'hashedpassword678',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Spy novelist and adventure critic.'
    },
    {
        userID: 12,
        username: 'jack_sparrow',
        type: 'Owner',
        password: 'hashedpassword789',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Owner of a pirate-themed restaurant.'
    },
    {
        userID: 13,
        username: 'karen_page',
        type: 'Reviewer',
        password: 'hashedpassword890',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Journalist and food critic.'
    },
    {
        userID: 14,
        username: 'lisa_simpson',
        type: 'Reviewer',
        password: 'hashedpassword901',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Music enthusiast and critic.'
    },
    {
        userID: 15,
        username: 'mickey_mouse',
        type: 'Owner',
        password: 'hashedpassword012',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Owner of an amusement park.'
    },
    {
        userID: 16,
        username: 'nancy_drew',
        type: 'Reviewer',
        password: 'hashedpassword1234',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Mystery novel critic.'
    },
    {
        userID: 17,
        username: 'oscar_wilde',
        type: 'Reviewer',
        password: 'hashedpassword2345',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Poet and playwright.'
    },
    {
        userID: 18,
        username: 'peter_parker',
        type: 'Reviewer',
        password: 'hashedpassword3456',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Photographer and tech reviewer.'
    },
    {
        userID: 19,
        username: 'quentin_tarantino',
        type: 'Reviewer',
        password: 'hashedpassword4567',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Film critic and director.'
    },
    {
        userID: 20,
        username: 'rocky_balboa',
        type: 'Reviewer',
        password: 'hashedpassword5678',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        description: 'Sports critic and boxing enthusiast.'
    }
];

module.exports = sampleUsers;