import { Box, Typography, Rating, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { orange, green } from '@mui/material/colors';
import { getImage } from '@/utils/getImage';
import type { IEstablishment } from '@/types/establishment.types';
import { useEstablishmentStore } from '@/features/place/usePlaceStore';
import { useUserStore } from '@/features/users/userStore';

interface Props {
  establishment: IEstablishment;
}

const EstablishmentCard = ({ establishment }: Props) => {
  const { _id, name, mainPhoto, ratings, reviews, images } = establishment;
  const { user } = useUserStore((state) => state);
  const { remove } = useEstablishmentStore((state) => state);

  return (
    <Box
      sx={{
        width: '300px',
        border: `2px solid ${green[900]}`,
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: `0 4px 20px ${orange[100]}`,
        },
      }}
    >
      <Box
        component={Link}
        to={`/establishments/${_id}`}
        sx={{ display: 'block' }}
      >
        <Box
          component="img"
          src={getImage(mainPhoto)}
          alt={name}
          sx={{
            width: '100%',
            height: 180,
            objectFit: 'contain',
            display: 'block',
            padding: 3,
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography
          component={Link}
          to={`/establishments/${_id}`}
          variant="subtitle1"
          sx={{
            color: orange[900],
            textDecoration: 'none',
            display: 'block',
            mb: 1,
            '&:hover': { color: orange[700] },
            fontWeight: 600,
          }}
        >
          {name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Rating
            value={ratings?.overall ?? 0}
            precision={0.1}
            readOnly
            size="small"
            sx={{
              '& .MuiRating-iconFilled': { color: orange[500] },
              '& .MuiRating-iconEmpty': { color: orange[100] },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: orange[900],
            }}
          >
            {ratings?.overall?.toFixed(1) ?? '0.0'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ReviewsIcon sx={{ fontSize: 15, color: green[500] }} />
            <Typography variant="caption" color={green[900]}>
              {reviews?.length ?? 0} reviews
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PhotoCameraIcon sx={{ fontSize: 15, color: green[500] }} />
            <Typography variant="caption" color={green[900]}>
              {images?.length ?? 0} photos
            </Typography>
          </Box>
        </Box>
        {user?.user.role === 'admin' && (
          <Button
            size="large"
            onClick={() => remove(establishment._id)}
            sx={{
              color: 'error.main',
              textTransform: 'none',
              width: '100%',
              textAlign: 'center',
              marginTop: 3,
            }}
          >
            Delete
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EstablishmentCard;
