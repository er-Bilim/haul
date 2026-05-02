import EstablishmentCard from '@/components/EstablishmentCard/EstablishmentCard';
import { useEstablishmentStore } from '@/features/place/usePlaceStore';
import { Box, Container, Grid, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useEffect } from 'react';

const EstablishmentsPage = () => {
  const { establishments, fetchAll, fetchAllLoading } = useEstablishmentStore(
    (state) => state,
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: green[900],
          marginBottom: 3,
        }}
      >
        All places
      </Typography>

      {fetchAllLoading ? (
        <Typography color="text.secondary">Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {establishments.map((establishment) => (
            <Box key={establishment._id}>
              <EstablishmentCard establishment={establishment} />
            </Box>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default EstablishmentsPage;
