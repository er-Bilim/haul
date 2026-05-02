import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { schemaLogin, type LoginFormData } from './lib/validation';
import { useUserStore } from '@/features/users/userStore';
import { green, orange } from '@mui/material/colors';

const LoginPage = () => {
  const navigate = useNavigate();

  const { loginUser, loginError, loginLoading } = useUserStore(
    (state) => state,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schemaLogin),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data).then(() => navigate('/'));
    } catch (error) {
      console.error(error);
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
            <Typography variant="h5">Login</Typography>
            <Typography color="text.secondary">
              Enter your details to continue
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {loginError && (
              <Alert
                severity="error"
                sx={{
                  marginBottom: 3,
                }}
              >
                {loginError.error}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Email"
              type="email"
              sx={{ mb: 2 }}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              sx={{ mb: 3 }}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loginLoading}
              sx={{
                py: 1.3,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                background: orange[100],
                color: green[900],
              }}
            >
              {loginLoading ? 'Loading...' : 'Login'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>or</Divider>

          <Typography sx={{ mt: 3, textAlign: 'center' }}>
            Don’t have an account?{' '}
            <Box
              component={Link}
              to="/signup"
              sx={{
                textDecoration: 'none',
                color: orange[900],
                fontWeight: 800,
                marginLeft: 1,
              }}
            >
              Sign up
            </Box>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
