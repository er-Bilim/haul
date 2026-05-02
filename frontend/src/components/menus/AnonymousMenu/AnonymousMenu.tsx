import Box from '@mui/material/Box';
import { green, orange } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
      <Box
        component={NavLink}
        to={'/login'}
        sx={{
          textDecoration: 'none',
          background: green[600],
          color: orange[100],
          width: '100px',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        sign in
      </Box>
      <Box
        component={NavLink}
        to={'/signup'}
        sx={{
          textDecoration: 'none',
          background: green[600],
          color: orange[100],
          width: '100px',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        sign up
      </Box>
    </Box>
  );
};

export default AnonymousMenu;
