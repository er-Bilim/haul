import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useUserStore } from '@/features/users/userStore';
import { green } from '@mui/material/colors';

const UserMenu = () => {
  const { logoutUser } = useUserStore((state) => state);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
      <Box
        component={NavLink}
        to={'place/add'}
        sx={{
          background: 'white',
          color: green[700],
          textDecoration: 'none',
          padding: '10px',
          borderRadius: 4,
        }}
      >
        Add new place
      </Box>
      <Box
        component={Button}
        onClick={handleLogout}
        sx={{
          background: 'white',
          color: green[700],
          textDecoration: 'none',
          padding: '10px',
          borderRadius: 4,
        }}
      >
        Logout
      </Box>
    </Box>
  );
};

export default UserMenu;
