import { Box, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { getImage } from '@/utils/getImage';

interface IImage {
  _id: string;
  url: string;
}

interface Props {
  images: IImage[];
}

const EstablishmentGallery = ({ images }: Props) => {
  if (!images?.length) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: orange[900],
          marginBottom: 1,
        }}
      >
        Gallery
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {images.map((img) => (
          <Box
            key={img._id}
            component="img"
            src={getImage(img.url)}
            alt={img._id}
            sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default EstablishmentGallery;
