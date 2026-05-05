const calculateAverageRating = (reviews) => {
    if (!reviews.length) return 0;

   const totalRatings = reviews.reduce((sum, review) => sum+review.rating,0);
    return totalRatings / reviews.length;
};

module.exports = calculateAverageRating;