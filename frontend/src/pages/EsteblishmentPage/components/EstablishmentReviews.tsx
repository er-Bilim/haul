import { useEstablishmentStore } from '@/features/place/usePlaceStore';
import { useUserStore } from '@/features/users/userStore';
import type { IReview } from '@/types/establishment.types';
import { Box, Button, Rating, Typography } from '@mui/material';
import { orange, green } from '@mui/material/colors';
import type { FC } from 'react';

interface Props {
  reviews: IReview[];
  establishmentId?: string;
}

const EstablishmentReviews: FC<Props> = ({ reviews, establishmentId }) => {
  const { user } = useUserStore((state) => state);
  const { removeReview } = useEstablishmentStore((state) => state);

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {reviews.map((review) => (
          <Box key={review._id} sx={{ mb: 2, width: '400px' }}>
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
                  color: green[900],
                  fontWeight: 600,
                  marginRight: 0.5,
                  fontSize: '1rem',
                }}
              >
                {review.author.displayName}
              </Typography>
              said:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginTop: 2,
                marginBottom: 2,
                letterSpacing: 2,
                fontSize: '1.2rem',
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
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 0.3,
                }}
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
            {user?.user.role === 'admin' && (
              <Button
                size="small"
                onClick={() =>
                  establishmentId && removeReview(establishmentId, review._id)
                }
                sx={{
                  width: '100%',
                  color: 'error.main',
                  border: 2,
                  borderColor: 'error.main',
                  textTransform: 'none',
                  textAlign: 'left',
                  marginTop: 3,
                }}
              >
                Delete
              </Button>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default EstablishmentReviews;
