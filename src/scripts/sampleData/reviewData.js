const sampleReviews = [
    {
        reviewID: 1,
        reviewerID: 16,
        resturantID: 1,
        reviewContent: 'The food was absolutely fantastic! Every dish was a delightful experience, and the service was impeccable. The ambiance was cozy and inviting, making it the perfect place for a family dinner or a romantic date. The staff went above and beyond to ensure we had a great time. Highly recommended!',
        reviewTitle: 'Amazing Experience',
        isRecommended: true,
        helpfulCount: 12,
        notHelpfulCount: 3
    },
    {
        reviewID: 2,
        reviewerID: 17,
        resturantID: 1,
        reviewContent: 'The restaurant had a great ambiance and comfortable seating. However, the food did not live up to the expectations. The flavors were rather bland, and the presentation was average. It is a decent place for a casual meal but not for a gourmet experience. The service was okay but could have been better.',
        reviewTitle: 'Average Food, Nice Ambiance',
        isRecommended: false,
        helpfulCount: 7,
        notHelpfulCount: 5
    },
    {
        reviewID: 3,
        reviewerID: 18,
        resturantID: 1,
        reviewContent: 'An excellent experience from start to finish! The staff was attentive and friendly, the food was mouth-watering, and the atmosphere was just right. We enjoyed every moment and will definitely come back again. This place is a hidden gem! Highly recommended for a delightful dining experience.',
        reviewTitle: 'Excellent Experience',
        isRecommended: true,
        helpfulCount: 15,
        notHelpfulCount: 2
    },
    {
        reviewID: 4,
        reviewerID: 19,
        resturantID: 1,
        reviewContent: 'The restaurant is nicely decorated, but the food was not worth the price. Portions were small and the taste was just average. I expected more considering the cost. The service was good, but overall, it did not meet my expectations. Not a place I would return to soon.',
        reviewTitle: 'Overpriced',
        isRecommended: false,
        helpfulCount: 5,
        notHelpfulCount: 10
    },
    {
        reviewID: 5,
        reviewerID: 20,
        resturantID: 1,
        reviewContent: 'Lovely place with friendly and welcoming staff. The food was delicious, and the atmosphere was great. It felt like a home away from home. I would definitely recommend this restaurant to anyone looking for a pleasant dining experience. A truly enjoyable evening!',
        reviewTitle: 'Friendly Staff',
        isRecommended: true,
        helpfulCount: 9,
        notHelpfulCount: 4
    },
    {
        reviewID: 6,
        reviewerID: 3,
        resturantID: 2,
        reviewContent: 'The meals were delicious, and the service was top-notch. From the appetizers to the desserts, everything was prepared to perfection. The staff was very attentive, making sure we had everything we needed. A wonderful dining experience! I would definitely come back again.',
        reviewTitle: 'Wonderful Experience',
        isRecommended: true,
        helpfulCount: 16,
        notHelpfulCount: 1
    },
    {
        reviewID: 7,
        reviewerID: 5,
        resturantID: 2,
        reviewContent: 'The ambiance of the restaurant was nice, but the food was mediocre at best. The dishes lacked flavor, and the portions were small. It is an okay place for a quick meal, but I wouldn’t go out of my way to dine here again. The service was fine but nothing exceptional. Not a memorable experience.',
        reviewTitle: 'Okay Experience',
        isRecommended: false,
        helpfulCount: 8,
        notHelpfulCount: 7
    },
    {
        reviewID: 8,
        reviewerID: 6,
        resturantID: 2,
        reviewContent: 'Fantastic experience! The food was outstanding, and the service was excellent. The staff went out of their way to make us feel welcome and ensure we had a great time. I highly recommend this restaurant for any occasion! A truly memorable dining experience.',
        reviewTitle: 'Excellent',
        isRecommended: true,
        helpfulCount: 13,
        notHelpfulCount: 2
    },
    {
        reviewID: 9,
        reviewerID: 8,
        resturantID: 2,
        reviewContent: 'The restaurant was overpriced, and the food was disappointing. The flavors were dull, and the dishes were not worth the money. I had high hopes but was let down by the overall experience. I would not recommend this place. There are better options available.',
        reviewTitle: 'Not Worth It',
        isRecommended: false,
        helpfulCount: 6,
        notHelpfulCount: 12
    },
    {
        reviewID: 10,
        reviewerID: 9,
        resturantID: 2,
        reviewContent: 'The service was great, but the food could have been better. Some dishes were tasty, but others were bland. The restaurant has potential, but there is room for improvement. It was a mixed experience for me. I might give it another try in the future.',
        reviewTitle: 'Mixed Feelings',
        isRecommended: true,
        helpfulCount: 10,
        notHelpfulCount: 5
    },
    {
        reviewID: 11,
        reviewerID: 11,
        resturantID: 3,
        reviewContent: 'Incredible food and ambiance! The flavors were rich and well-balanced, and the presentation was beautiful. The atmosphere was elegant yet cozy. This is a perfect spot for a special night out. Highly recommend to anyone looking for a great dining experience!',
        reviewTitle: 'Highly Recommend',
        isRecommended: true,
        helpfulCount: 14,
        notHelpfulCount: 3
    },
    {
        reviewID: 12,
        reviewerID: 13,
        resturantID: 3,
        reviewContent: 'The service was not impressive. The staff seemed inattentive, and the food took a long time to arrive. When it finally did, it was just okay. There are better options out there. I wouldn’t rush back to this restaurant.',
        reviewTitle: 'Could Be Better',
        isRecommended: false,
        helpfulCount: 4,
        notHelpfulCount: 8
    },
    {
        reviewID: 13,
        reviewerID: 14,
        resturantID: 3,
        reviewContent: 'Delightful experience from start to finish! The meals were delicious, the service was excellent, and the atmosphere was just perfect. I will definitely visit again. It’s one of the best dining experiences I’ve had in a while. Highly recommended!',
        reviewTitle: 'Wonderful',
        isRecommended: true,
        helpfulCount: 11,
        notHelpfulCount: 2
    },
    {
        reviewID: 14,
        reviewerID: 16,
        resturantID: 3,
        reviewContent: 'The food was average, but the ambiance was great. It’s a nice place to hang out with friends, but don’t expect gourmet cuisine. The service was decent, but there is room for improvement in the kitchen. Overall, it’s a decent place for a casual meal. Not my first choice for fine dining.',
        reviewTitle: 'Decent Experience',
        isRecommended: false,
        helpfulCount: 6,
        notHelpfulCount: 10
    },
    {
        reviewID: 15,
        reviewerID: 17,
        resturantID: 3,
        reviewContent: 'The service was good, but the food was lacking in flavor. The dishes looked appealing, but the taste did not match the presentation. It’s not a place I would return to for a memorable meal. There is potential, but more attention to the food is needed. I hope they improve in the future.',
        reviewTitle: 'Not Great',
        isRecommended: true,
        helpfulCount: 10,
        notHelpfulCount: 6
    },
    {
        reviewID: 16,
        reviewerID: 18,
        resturantID: 4,
        reviewContent: 'Fantastic meals and wonderful service! Every dish was a delight, and the staff was very friendly and accommodating. The restaurant has a warm and welcoming atmosphere. I highly recommend it to anyone looking for a great dining experience. A must-visit for food lovers!',
        reviewTitle: 'Amazing',
        isRecommended: true,
        helpfulCount: 14,
        notHelpfulCount: 2
    },
    {
        reviewID: 17,
        reviewerID: 19,
        resturantID: 4,
        reviewContent: 'The service was good, but the food was just okay. It wasn’t bad, but it didn’t stand out either. The ambiance was nice, but I expected more from the food. It’s an average place overall. Not somewhere I would go out of my way to visit again.',
        reviewTitle: 'Mediocre Experience',
        isRecommended: false,
        helpfulCount: 5,
        notHelpfulCount: 9
    },
    {
        reviewID: 18,
        reviewerID: 20,
        resturantID: 4,
        reviewContent: 'Exceptional experience! The food was delicious, and the service was outstanding. The staff made us feel very welcome, and the atmosphere was perfect for a special occasion. I highly recommend this restaurant! It’s definitely worth a visit.',
        reviewTitle: 'Outstanding',
        isRecommended: true,
        helpfulCount: 17,
        notHelpfulCount: 1
    },
    {
        reviewID: 19,
        reviewerID: 3,
        resturantID: 4,
        reviewContent: 'Disappointed with the food quality. The dishes were overpriced and not very tasty. The service was fine, but the food did not meet my expectations. I would not recommend this restaurant based on my experience. There are better places to dine.',
        reviewTitle: 'Not Worth the Price',
        isRecommended: false,
        helpfulCount: 6,
        notHelpfulCount: 13
    },
    {
        reviewID: 20,
        reviewerID: 5,
        resturantID: 4,
        reviewContent: 'Lovely place with a friendly atmosphere. The food was good, and the staff was very welcoming. It’s a nice spot for a casual meal with friends or family. I enjoyed my time here and would visit again. A charming place for a relaxed meal.',
        reviewTitle: 'Charming',
        isRecommended: true,
        helpfulCount: 8,
        notHelpfulCount: 5
    },
    {
        reviewID: 21,
        reviewerID: 3,
        resturantID: 5,
        reviewContent: 'Fantastic dining experience with exceptional service! The food was flavorful and beautifully presented. The staff was attentive and made sure we had a great time. This restaurant is a must-visit! Highly recommended for anyone looking for a memorable meal.',
        reviewTitle: 'Unforgettable Experience',
        isRecommended: true,
        helpfulCount: 18,
        notHelpfulCount: 2
    },
    {
        reviewID: 22,
        reviewerID: 5,
        resturantID: 5,
        reviewContent: 'The food was good, but the ambiance was the highlight. The restaurant is beautifully decorated and very comfortable. The service was also good, making for an overall pleasant dining experience. I would recommend this place for its lovely atmosphere. Definitely worth a visit!',
        reviewTitle: 'Great Ambiance',
        isRecommended: true,
        helpfulCount: 11,
        notHelpfulCount: 3
    },
    {
        reviewID: 23,
        reviewerID: 6,
        resturantID: 5,
        reviewContent: 'A delightful place with delicious dishes. The service was friendly and efficient, and the atmosphere was cozy. I would definitely come back for another meal. It’s a great spot for a relaxed dining experience. Highly recommended for a casual meal.',
        reviewTitle: 'Delightful Experience',
        isRecommended: true,
        helpfulCount: 10,
        notHelpfulCount: 4
    },
    {
        reviewID: 24,
        reviewerID: 8,
        resturantID: 5,
        reviewContent: 'Good food but service was slow. We had to wait a long time for our dishes, and some of the food arrived cold. The flavors were nice, but the overall experience was marred by the slow service. It could have been better. Not sure if I would return.',
        reviewTitle: 'Mixed Feelings',
        isRecommended: false,
        helpfulCount: 7,
        notHelpfulCount: 8
    },
    {
        reviewID: 25,
        reviewerID: 9,
        resturantID: 5,
        reviewContent: 'Amazing flavors and friendly staff! The dishes were bursting with flavor, and the staff was very welcoming. It’s a great place for a meal with friends or family. I highly recommend this restaurant! A fantastic dining experience overall.',
        reviewTitle: 'Highly Recommend',
        isRecommended: true,
        helpfulCount: 14,
        notHelpfulCount: 2
    }
];

module.exports = sampleReviews;