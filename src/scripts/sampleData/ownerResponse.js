const sampleResponses = [
    {
      responseID: 1,
      ownerID: 2,
      reviewID: 1,
      resturantID: 1,
      responseTitle: "Thank you for your feedback!",
      responseContent: "We are glad you enjoyed your visit!"
    },
    {
      responseID: 2,
      ownerID: 4,
      reviewID: 6,
      resturantID: 2,
      responseTitle: "Apologies for the inconvenience",
      responseContent: "We are looking into this issue and hope to resolve it promptly and accurately."
    },
    {
      responseID: 3,
      ownerID: 7,
      reviewID: 11,
      resturantID: 3,
      responseTitle: "Thanks!",
      responseContent: "We appreciate your positive review and look forward to your next visit."
    },
    {
      responseID: 4,
      ownerID: 10,
      reviewID: 16,
      resturantID: 4,
      responseTitle: "We are sorry",
      responseContent: "We strive to ensure every guest experience is wonderful. We missed that mark this time."
    },
    {
      responseID: 5,
      ownerID: 12, 
      reviewID: 21,
      resturantID: 5,
      responseTitle: "Great!",
      responseContent: "Thank you so much for your kind words. We look forward to serving you again!"
    }
  ];
  
  module.exports = sampleResponses;
  

// ownerIDs = 2, 4, 7, 10, 12
// ResturantIDs = 1, 2, 3, 4, 5
// ReviewIDs = 1-5 for resturantID 1, 6-10 for resturantID 2, 11-15 for resturantID 3, 16-20 for resturantID 4, 21-25 for resturantID 5