import { Box, Button, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { getImage } from '@/utils/getImage';
import { useUserStore } from '@/features/users/userStore';
import { useEstablishmentStore } from '@/features/place/usePlaceStore';
import type { FC } from 'react';

interface IImage {
  _id: string;
  url: string;
}

interface Props {
  images: IImage[];
  establishmentId?: string;
}

const EstablishmentGallery: FC<Props> = ({ images, establishmentId }) => {
  const { user } = useUserStore((state) => state);
  const { removeImage } = useEstablishmentStore((state) => state);
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
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box
              key={img._id}
              component="img"
              src={getImage(img.url)}
              alt={img._id}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
            {user?.user.role === 'admin' && (
              <Button
                size="small"
                onClick={() =>
                  establishmentId && removeImage(establishmentId, img._id)
                }
                sx={{ color: 'error.main' }}
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

export default EstablishmentGallery;
