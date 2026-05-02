import type { IReview } from '../types/review/review.types.ts';

const calculateRatings = (reviews: IReview[]) => {
  if (!reviews.length) {
    return {
      qualityOfFood: 0,
      serviceQuality: 0,
      interior: 0,
      overall: 0,
    };
  }

  const sum = reviews.reduce(
    (acc, review) => ({
      qualityOfFood: acc.qualityOfFood + review.qualityOfFood,
      serviceQuality: acc.serviceQuality + review.serviceQuality,
      interior: acc.interior + review.interior,
    }),
    {
      qualityOfFood: 0,
      serviceQuality: 0,
      interior: 0,
    },
  );

  const lengthReview = reviews.length;
  const qualityOfFoodRatingAvg = sum.qualityOfFood / lengthReview;
  const serviceQualityRatingAvg = sum.serviceQuality / lengthReview;
  const interiorRatingAvg = sum.interior / lengthReview;

  return {
    qualityOfFoodRatingAvg: Math.round(qualityOfFoodRatingAvg * 10) / 10,
    serviceQualityRatingAvg: Math.round(serviceQualityRatingAvg * 10) / 10,
    interior: Math.round(interiorRatingAvg * 10) / 10,
    overall:
      Math.round(
        ((qualityOfFoodRatingAvg +
          serviceQualityRatingAvg +
          interiorRatingAvg) /
          3) *
          10,
      ) / 10,
  };
};

export default calculateRatings;
