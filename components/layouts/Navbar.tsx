import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '../share/Button';
import { useAppDispatch } from '@/store/hooks';
import { authActions } from '@/store/auth/authSlice';
import { getAuth } from '@/utils/auth';
import dynamic from 'next/dynamic';

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
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontSize: 16, color: 'common.white', textTransform: 'capitalize', mr: 2 }}
              >
                {'All Categories'}
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontSize: 16, color: 'common.white', textTransform: 'capitalize' }}
              >
                {'View Plans'}
              </Typography>
            </Box>
            {currentUser ? (
              <>
                <Profile />
              </>
            ) : (
              <>
                <Box>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    sx={{ height: '100%', borderRadius: '2px' }}
                  >
                    Get started
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(authActions.openSignInModal())}
                  >
                    Sign in
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
