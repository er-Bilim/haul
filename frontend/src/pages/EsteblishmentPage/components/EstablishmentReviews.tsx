import type { IReview } from '@/types/establishment.types';
import { Box, Rating, Typography } from '@mui/material';
import { orange, green } from '@mui/material/colors';

interface Props {
  reviews: IReview[];
}

const EstablishmentReviews = ({ reviews }: Props) => {
  if (!reviews?.length) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: orange[900],
          marginBottom: 2,
        }}
      >
        Reviews
      </Typography>
      {reviews.map((review) => (
        <Box key={review._id} sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              marginBottom: 0.5,
            }}
          >
            On {new Date(review.createdAt).toLocaleDateString()},{' '}
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: green[700],
                fontWeight: 600,
                marginRight: 1,
              }}
            >
              {review.author.displayName}
            </Typography>
            said:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginBottom: 1,
            }}
          >
            {review.text}
          </Typography>
          {[
            { label: 'Quality of food:', value: review.qualityOfFood },
            { label: 'Service quality:', value: review.serviceQuality },
            { label: 'Interior:', value: review.interior },
          ].map(({ label, value }) => (
            <Box
              key={label}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.3 }}
            >
              <Typography
                variant="caption"
                sx={{ width: 120 }}
                color="text.secondary"
              >
                {label}
              </Typography>
              <Rating
                value={value}
                readOnly
                size="small"
                sx={{
                  '& .MuiRating-iconFilled': { color: orange[500] },
                  '& .MuiRating-iconEmpty': { color: orange[100] },
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                }}
              >
                {value.toFixed(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default EstablishmentReviews;
