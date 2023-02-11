import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { getAuth } from '@/utils/auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import dynamic from 'next/dynamic';
import Button from '../share/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

const Profile = dynamic(() => import('@/contents/profile/Profile'));

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = getAuth()?.user;
  return (
    <>
      <AppBar position="fixed">
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box>
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="#"
                sx={{ fontSize: 24, textTransform: 'capitalize' }}
              >
                {'Theraisedhands'}
              </Link>
            </Box>
            <Box>
              <Button variant="text" size="small" color="inherit">
                {'All Categories'}
                <ExpandMoreIcon />
              </Button>
              <Button variant="text" size="small" color="inherit">
                <SearchIcon fontSize="small" color="inherit" sx={{ mr: 0.5 }} />
                {'Search'}
              </Button>
              <Button variant="text" size="small" color="inherit">
                {'View Plans'}
              </Button>
            </Box>
            {currentUser ? (
              <>
                <Profile />
              </>
            ) : (
              <>
                <Box>
                  <Button variant="text" size="small" color="inherit">
                    At work
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    color="inherit"
                    onClick={() => dispatch(authActions.openSignInModal())}
                  >
                    Log in
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
