export const calculateAverageRating = (reviews = []) => {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return 0;
  }

  const totalRatings = reviews.reduce(
    (sum, review) => sum + (Number(review?.rating) || 0),
    0
  );

  return totalRatings / reviews.length;
};
