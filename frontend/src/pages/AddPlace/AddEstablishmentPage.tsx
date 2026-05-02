import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  schemaAddEstablishment,
  type AddEstablishmentFormData,
} from './lib/validation';
import { useEstablishmentStore } from '@/features/place/usePlaceStore';
import FileInput from '@/components/FileInput/FileInput';
import { green, orange } from '@mui/material/colors';
import type { ChangeEvent } from 'react';

const AddEstablishmentPage = () => {
  const navigate = useNavigate();
  const { create, createLoading, createError } = useEstablishmentStore(
    (state) => state,
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AddEstablishmentFormData>({
    resolver: zodResolver(schemaAddEstablishment),
  });

  const onSubmit = async (data: AddEstablishmentFormData) => {
    try {
      await create({
        name: data.name,
        description: data.description,
        mainPhoto: data.mainPhoto,
        terms: data.terms,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files && files[0] && name === 'mainPhoto') {
      setValue(name, files[0]);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', p: 4, borderRadius: 4 }}>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h5">Add new place</Typography>
            <Typography color="text.secondary">
              Fill in the details about the establishment
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {createError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {createError.error}
              </Alert>
            )}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <Typography>Main Photo</Typography>
              <Box
                sx={{
                  width: '100%',
                  height: '250px',
                  overflow: 'hidden',
                  border: 4,
                  mb: 3,
                  borderColor: orange[500],
                }}
              >
                <FileInput
                  label="Artist Photo"
                  {...register('mainPhoto')}
                  onChange={onChangeFileHandler}
                />
              </Box>
            </Box>

            <TextField
              fullWidth
              label="Name"
              sx={{ mb: 2 }}
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name')}
            />

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              sx={{ mb: 2 }}
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register('description')}
            />
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="By submitting this form, you agree that the information will be submitted to the public domain"
                />
              )}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={createLoading}
              sx={{
                py: 1.3,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                background: orange[200],
                color: green[900],
                mt: 2,
              }}
            >
              Submit new place
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddEstablishmentPage;
