import Container from '@mui/material/Container';
import AuthMenu from '../menus/AuthMenu/AuthMenu';
import Box from '@mui/material/Box';
import { orange } from '@mui/material/colors';

const Header = () => {
  return (
    <Box
      component={'header'}
      sx={{
        background: orange[100],
        padding: '10px',
      }}
    >
      <Container maxWidth="lg">
        <AuthMenu />
      </Container>
    </Box>
  );
};

export default Header;
