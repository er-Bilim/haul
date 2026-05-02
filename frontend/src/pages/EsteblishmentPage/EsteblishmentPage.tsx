import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { getImage } from '@/utils/getImage';
import { useEstablishmentStore } from '@/features/place/usePlaceStore';
import EstablishmentGallery from './components/EstablishmentGallery';
import EstablishmentRatings from './components/EstablishmentRatings';
import EstablishmentReviews from './components/EstablishmentReviews';
import AddReviewForm from './components/form/AddReviewForm';
import AddPhotoForm from './components/form/AddPhotoForm';

const EstablishmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentEstablishment, fetchOne, fetchOneLoading } =
    useEstablishmentStore((state) => state);

  useEffect(() => {
    if (id) fetchOne(id);
  }, [id, fetchOne]);

  if (fetchOneLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress sx={{ color: orange[500] }} />
      </Box>
    );
  }

  if (!currentEstablishment) return null;

  const { name, description, mainPhoto, ratings, reviews, images } =
    currentEstablishment;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: orange[900],
              marginBottom: 1,
            }}
          >
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Box>
        <Box
          component="img"
          src={getImage(mainPhoto)}
          alt={name}
          sx={{
            width: 200,
            height: 150,
            objectFit: 'cover',
            borderRadius: 2,
            flexShrink: 0,
          }}
        />
      </Box>

      <EstablishmentGallery images={images} />
      <EstablishmentRatings ratings={ratings} />
      <EstablishmentReviews reviews={reviews} />

      {id && (
        <>
          <AddReviewForm establishmentId={id} />
          <AddPhotoForm establishmentId={id} />
        </>
      )}
    </Container>
  );
};

export default EstablishmentPage;
