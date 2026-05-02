import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { orange } from '@mui/material/colors';
import { useEstablishmentStore } from '@/features/place/usePlaceStore';

interface Props {
  establishmentId: string;
}

const ratingOptions = [1, 2, 3, 4, 5];

const AddReviewForm = ({ establishmentId }: Props) => {
  const { addReview, reviewLoading } = useEstablishmentStore((state) => state);
  const [text, setText] = useState('');
  const [qualityOfFood, setQualityOfFood] = useState(5);
  const [serviceQuality, setServiceQuality] = useState(5);
  const [interior, setInterior] = useState(5);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    await addReview(establishmentId, {
      text,
      qualityOfFood,
      serviceQuality,
      interior,
    });
    setText('');
    setQualityOfFood(5);
    setServiceQuality(5);
    setInterior(5);
  };

  const selectSx = { width: 80 };

  return (
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
        Add review
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}
      >
        {[
          {
            label: 'Quality of food:',
            value: qualityOfFood,
            set: setQualityOfFood,
          },
          {
            label: 'Service quality:',
            value: serviceQuality,
            set: setServiceQuality,
          },
          { label: 'Interior:', value: interior, set: setInterior },
        ].map(({ label, value, set }) => (
          <Box
            key={label}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <TextField
              select
              size="small"
              value={value}
              onChange={(e) => set(Number(e.target.value))}
              sx={selectSx}
            >
              {ratingOptions.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        ))}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={reviewLoading || !text.trim()}
          sx={{
            ml: 'auto',
            backgroundColor: orange[500],
            '&:hover': { backgroundColor: orange[700] },
            textTransform: 'none',
          }}
        >
          Submit review
        </Button>
      </Box>
    </Box>
  );
};

export default AddReviewForm;
