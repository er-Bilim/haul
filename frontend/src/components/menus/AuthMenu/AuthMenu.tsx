import Box from '@mui/material/Box';
import AnonymousMenu from '../AnonymousMenu/AnonymousMenu';
import { useUserStore } from '@/features/users/userStore';
import UserMenu from '../UserMenu/UserMenu';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const AuthMenu = () => {
  const { user } = useUserStore((state) => state);

  const renderMenu = () => {
    if (!user) {
      return (
        <>
          <AnonymousMenu />
        </>
      );
    }

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}
        >
          <UserMenu />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                letterSpacing: 2,
              }}
            >
              <Typography>{user.user.displayName}</Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Box
            sx={{
              width: '60px',
              height: '60px',
              borderRadius: '100%',
              overflow: 'hidden',
            }}
          >
            <Box
              component={'img'}
              src="./haul_logo.png"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
          <Typography
            component={Link}
            sx={{
              fontSize: '1.5rem',
              letterSpacing: '5px',
              color: green[900],
              fontWeight: 900,
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
            to={'/'}
          >
            Haul
          </Typography>
        </Box>
        <Box>{renderMenu()}</Box>
      </Box>
    </>
  );
};

export default AuthMenu;
