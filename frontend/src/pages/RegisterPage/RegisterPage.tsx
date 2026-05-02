import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FileInput from '@/components/FileInput/FileInput';
import { green, orange } from '@mui/material/colors';
import type { ChangeEvent } from 'react';
import { schemaRegister, type RegisterFormData } from './lib/validation';
import { useUserStore } from '@/features/users/userStore';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const navigate = useNavigate();

  const { registerUser, registerError, registerLoading } = useUserStore(
    (state) => state,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schemaRegister),
  });

  if (registerError) {
    toast.error(registerError.message);
  }

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data).then(() => navigate('/'));
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files && files[0] && name === 'avatar') {
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
            <Typography variant="h5">Register</Typography>
            <Typography color="text.secondary">Create your account</Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <Box
                sx={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '100%',
                  overflow: 'hidden',
                  border: 4,
                  mb: 3,
                  borderColor: orange[500],
                }}
              >
                <FileInput
                  label="Artist Photo"
                  {...register('avatar')}
                  onChange={onChangeFileHandler}
                />
              </Box>
            </Box>
            <TextField
              fullWidth
              label="Email"
              sx={{ mb: 2 }}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />

            <TextField
              fullWidth
              label="Display name"
              sx={{ mb: 2 }}
              error={!!errors.displayName}
              helperText={errors.displayName?.message}
              {...register('displayName')}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              sx={{ mb: 2 }}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={registerLoading}
              sx={{
                py: 1.3,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                background: orange[100],
                color: green[900],
              }}
            >
              {registerLoading ? 'Loading...' : 'Register'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>or</Divider>

          <Typography sx={{ mt: 3, textAlign: 'center' }}>
            Already have an account?
            <Box
              component={Link}
              to="/login"
              sx={{
                textDecoration: 'none',
                color: orange[900],
                fontWeight: 800,
                marginLeft: 1,
              }}
            >
              Login
            </Box>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
