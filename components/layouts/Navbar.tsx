import useOnClickOutside from '@/hooks/useOnClickOutside';
import { authActions } from '@/store/auth/authSlice';
import { categoriesActions } from '@/store/categories/categoriesSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAuth } from '@/utils/auth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import IconMenu from '../../public/icon/icon-menu.svg';
import Logo from '../../public/logo.png';
import ModalCategories from '../categories/modalCategories';
import ModalSearch from '../categories/modalSearch';
import Button from '../share/Button';
import Typography from '../share/Typography';

const Profile = dynamic(() => import('@/contents/profile/Profile'));

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const listCategories = useAppSelector((state) => state.categories.listData);
  const currentUser = getAuth()?.user;
  const router = useRouter();

  const [showCategory, setShowCategory] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();
  const refSearch = useRef();
  const handleClickOutside = () => {
    setShowCategory(false);
  };
  const handleClickOutsideSearch = () => {
    setShowSearch(false);
  };
  useOnClickOutside(ref, handleClickOutside);
  useOnClickOutside(refSearch, handleClickOutsideSearch);

  useEffect(() => {
    dispatch(categoriesActions.fetchData({}));
  }, []);

  return (
    <>
      <AppBar sx={{ position: 'fixed', top: 0 }}>
        <Container
          sx={{
            maxWidth: {
              lg: '1328px',
              sm: '100%',
              md: '100%',
            },
            padding: {
              sm: '0 16px',
              md: '0 64px',
              lg: '0 64px',
            },
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
              padding: '0px 0px !important',
            }}
          >
            <Box
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              onClick={() => router.push('/')}
            >
              <Image
                src={Logo}
                alt="logo"
                height={80}
                width={80}
                style={{
                  objectFit: 'cover',
                }}
              />
              <h2 style={{ fontSize: '16px' }}>TheRaisedHands</h2>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ position: 'relative' }} ref={ref}>
                <Button
                  variant="text"
                  size="small"
                  color="inherit"
                  onClick={() => setShowCategory((preState) => !preState)}
                >
                  {'All Categories'}
                  <ExpandMoreIcon />
                </Button>
                {showCategory && (
                  <ModalCategories
                    listCategories={listCategories}
                    setShowCategory={setShowCategory}
                  />
                )}
              </Box>
              <Box sx={{ position: 'relative' }} ref={refSearch}>
                <Button
                  variant="text"
                  size="small"
                  color="inherit"
                  sx={{
                    width: 'max-content',
                    display: {
                      xs: 'none',
                      sm: 'flex',
                    },
                  }}
                  onClick={() => setShowSearch((preState) => !preState)}
                >
                  <SearchIcon fontSize="small" color="inherit" sx={{ mr: 0.5 }} />
                  {'Search'}
                </Button>
                {showSearch && (
                  <ModalSearch listCategories={listCategories} setShowSearch={setShowSearch} />
                )}
              </Box>
              <Button
                variant="text"
                size="small"
                color="inherit"
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                {'View Plans'}
              </Button>
              <Box
                sx={{
                  height: '26px',
                  display: {
                    xs: 'block',
                    sm: 'none',
                  },
                }}
              >
                <Image
                  src={IconMenu}
                  alt="icon-menu"
                  onClick={() => setShowMenu((preState) => !preState)}
                />
                {showMenu && <ModalSearch setShowSearch={setShowMenu} showMenu={true} />}
              </Box>
            </Box>
            {currentUser ? (
              <>
                <Profile />
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'flex',
                    },
                  }}
                >
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
      {/* <Toolbar /> */}
    </>
  );
};

export default Navbar;
