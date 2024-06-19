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
        profpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3lP2tEHPTzfypa5ZhIydhNXvmvdbR12TsRA&s',
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
        profpic: 'https://upload.wikimedia.org/wikipedia/en/2/22/Charlie_Brown.png',
        description: 'Tech enthusiast and gadget reviewer.'
    },
    {
        userID: 6,
        username: 'daisy_duck',
        type: 'Reviewer',
        password: 'hashedpassword123',
        profpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJe0FIBpnbLeiJRAetj7i5MbyG4NBKA8_RTw&s',
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
        profpic: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Frank_Underwood_-_House_of_Cards.jpg',
        description: 'Political commentator and author.'
    },
    {
        userID: 9,
        username: 'george_orwell',
        type: 'Reviewer',
        password: 'hashedpassword456',
        profpic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/George_Orwell%2C_c._1940_%2841928180381%29.jpg/1200px-George_Orwell%2C_c._1940_%2841928180381%29.jpg',
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
        profpic: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Ian_Fleming.jpg',
        description: 'Spy novelist and adventure critic.'
    },
    {
        userID: 12,
        username: 'jack_sparrow',
        type: 'Owner',
        password: 'hashedpassword789',
        profpic: 'https://vignette.wikia.nocookie.net/disney/images/9/90/Pirates4JackSparrowPosterCropped.jpg/revision/latest?cb=20151120172626',
        description: 'Owner of a pirate-themed restaurant.'
    },
    {
        userID: 13,
        username: 'karen_page',
        type: 'Reviewer',
        password: 'hashedpassword890',
        profpic: 'https://upload.wikimedia.org/wikipedia/en/2/24/Karen_Page_%28comics%29.png',
        description: 'Journalist and food critic.'
    },
    {
        userID: 14,
        username: 'lisa_simpson',
        type: 'Reviewer',
        password: 'hashedpassword901',
        profpic: 'https://upload.wikimedia.org/wikipedia/en/e/ec/Lisa_Simpson.png',
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
        profpic: 'https://variety.com/wp-content/uploads/2019/10/nancy-drew.jpg',
        description: 'Mystery novel critic.'
    },
    {
        userID: 17,
        username: 'oscar_wilde',
        type: 'Reviewer',
        password: 'hashedpassword2345',
        profpic: 'https://poemanalysis.com/wp-content/uploads/2021/01/Oscar-Wilde-Portrait.jpg',
        description: 'Poet and playwright.'
    },
    {
        userID: 18,
        username: 'peter_parker',
        type: 'Reviewer',
        password: 'hashedpassword3456',
        profpic: 'https://images.squarespace-cdn.com/content/v1/624a1c23d68c8a3f214fbe39/ac1c6488-f37a-432f-97a1-5cd45569e70b/isaac-olander-peter-parker-tobey-maguire-below-isaac-olander.jpg',
        description: 'Photographer and tech reviewer.'
    },
    {
        userID: 19,
        username: 'quentin_tarantino',
        type: 'Reviewer',
        password: 'hashedpassword4567',
        profpic: 'https://variety.com/wp-content/uploads/2020/12/Quentin_Tarantino.png',
        description: 'Film critic and director.'
    },
    {
        userID: 20,
        username: 'rocky_balboa',
        type: 'Reviewer',
        password: 'hashedpassword5678',
        profpic: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Rocky_balboa.jpeg/200px-Rocky_balboa.jpeg',
        description: 'Sports critic and boxing enthusiast.'
    }
];

module.exports = sampleUsers;