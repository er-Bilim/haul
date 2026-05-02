import { Box, Divider, Rating, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';

interface RatingsProps {
  overall: number;
  qualityOfFood: number;
  serviceQuality: number;
  interior: number;
}

interface Props {
  ratings: RatingsProps;
}

const RatingRow = ({ label, value }: { label: string; value: number }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
    <Typography
      variant="body2"
      sx={{ width: 130, color: 'text.primary', fontWeight: 600 }}
    >
      {label}
    </Typography>
    <Rating
      value={value}
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
      {value.toFixed(1)}
    </Typography>
  </Box>
);

const EstablishmentRatings = ({ ratings }: Props) => (
  <Box sx={{ mb: 3 }}>
    <Divider sx={{ mb: 2 }} />
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        color: orange[900],
        marginBottom: 1.5,
      }}
    >
      Ratings
    </Typography>
    <RatingRow label="Overall:" value={ratings?.overall ?? 0} />
    <RatingRow label="Quality of food:" value={ratings?.qualityOfFood ?? 0} />
    <RatingRow label="Service quality:" value={ratings?.serviceQuality ?? 0} />
    <RatingRow label="Interior:" value={ratings?.interior ?? 0} />
    <Divider sx={{ mt: 2 }} />
  </Box>
);

export default EstablishmentRatings;
