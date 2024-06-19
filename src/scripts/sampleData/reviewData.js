const sampleReviews = [
    {
        reviewID: 1,
        reviewerID: 16,
        resturantID: 1,
        reviewContent: 'Great food and service!',
        reviewTitle: 'Amazing Experience',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 2,
        reviewerID: 17,
        resturantID: 1,
        reviewContent: 'Good ambiance but the food was average.',
        reviewTitle: 'Average Food, Nice Ambiance',
        isRecommended: false,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 3,
        reviewerID: 18,
        resturantID: 1,
        reviewContent: 'Excellent experience, will come again.',
        reviewTitle: 'Excellent Experience',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 4,
        reviewerID: 19,
        resturantID: 1,
        reviewContent: 'Not worth the price.',
        reviewTitle: 'Overpriced',
        isRecommended: false,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 5,
        reviewerID: 20,
        resturantID: 1,
        reviewContent: 'Lovely place with friendly staff.',
        reviewTitle: 'Friendly Staff',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 6,
        reviewerID: 3,
        resturantID: 2,
        reviewContent: 'Delicious meals and great service!',
        reviewTitle: 'Wonderful Experience',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 7,
        reviewerID: 5,
        resturantID: 2,
        reviewContent: 'Nice ambiance but the food was mediocre.',
        reviewTitle: 'Okay Experience',
        isRecommended: false,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 8,
        reviewerID: 6,
        resturantID: 2,
        reviewContent: 'Fantastic experience, highly recommend!',
        reviewTitle: 'Excellent',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 9,
        reviewerID: 8,
        resturantID: 2,
        reviewContent: 'Overpriced and disappointing.',
        reviewTitle: 'Not Worth It',
        isRecommended: false,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 10,
        reviewerID: 9,
        resturantID: 2,
        reviewContent: 'Great service but food could be better.',
        reviewTitle: 'Mixed Feelings',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 11,
        reviewerID: 11,
        resturantID: 3,
        reviewContent: 'Incredible food and ambiance!',
        reviewTitle: 'Highly Recommend',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 12,
        reviewerID: 13,
        resturantID: 3,
        reviewContent: 'Not impressed with the service.',
        reviewTitle: 'Could Be Better',
        isRecommended: false,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 13,
        reviewerID: 14,
        resturantID: 3,
        reviewContent: 'Delightful experience, will visit again!',
        reviewTitle: 'Wonderful',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 14,
        reviewerID: 16,
        resturantID: 3,
        reviewContent: 'Average food, great ambiance.',
        reviewTitle: 'Decent Experience',
        isRecommended: false,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 15,
        reviewerID: 17,
        resturantID: 3,
        reviewContent: 'Good service but food was lacking.',
        reviewTitle: 'Not Great',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 16,
        reviewerID: 18,
        resturantID: 4,
        reviewContent: 'Fantastic meals and wonderful service!',
        reviewTitle: 'Amazing',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 17,
        reviewerID: 19,
        resturantID: 4,
        reviewContent: 'Service was good but food was just okay.',
        reviewTitle: 'Mediocre Experience',
        isRecommended: false,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 18,
        reviewerID: 20,
        resturantID: 4,
        reviewContent: 'Exceptional experience, highly recommend!',
        reviewTitle: 'Outstanding',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 19,
        reviewerID: 3,
        resturantID: 4,
        reviewContent: 'Disappointed with the food quality.',
        reviewTitle: 'Not Worth the Price',
        isRecommended: false,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 20,
        reviewerID: 5,
        resturantID: 4,
        reviewContent: 'Lovely place with a friendly atmosphere.',
        reviewTitle: 'Charming',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 21,
        reviewerID: 3,
        resturantID: 5,
        reviewContent: 'Fantastic dining experience with exceptional service!',
        reviewTitle: 'Unforgettable Experience',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 22,
        reviewerID: 5,
        resturantID: 5,
        reviewContent: 'The food was good, but the ambiance was the highlight.',
        reviewTitle: 'Great Ambiance',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 23,
        reviewerID: 6,
        resturantID: 5,
        reviewContent: 'A delightful place with delicious dishes.',
        reviewTitle: 'Delightful Experience',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 24,
        reviewerID: 8,
        resturantID: 5,
        reviewContent: 'Good food but service was slow.',
        reviewTitle: 'Mixed Feelings',
        isRecommended: false,
        helpfulCount: 0,
        notHelpfulCount: 0
    },
    {
        reviewID: 25,
        reviewerID: 9,
        resturantID: 5,
        reviewContent: 'Amazing flavors and friendly staff!',
        reviewTitle: 'Highly Recommend',
        isRecommended: true,
        helpfulCount: 0,
        notHelpfulCount: 0
    }
];

module.exports = sampleReviews;
