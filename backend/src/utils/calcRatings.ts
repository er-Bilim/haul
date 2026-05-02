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
  const qualityOfFood = sum.qualityOfFood / lengthReview;
  const serviceQuality = sum.serviceQuality / lengthReview;
  const interior = sum.interior / lengthReview;

  return {
    qualityOfFood: Math.round(qualityOfFood * 10) / 10,
    serviceQuality: Math.round(serviceQuality * 10) / 10,
    interior: Math.round(interior * 10) / 10,
    overall:
      Math.round(
        ((qualityOfFood +
          serviceQuality +
          interior) /
          3) *
          10,
      ) / 10,
  };
};

export default calculateRatings;
