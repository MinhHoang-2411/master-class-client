import { Box, CardMedia, Divider, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import TwitterIcon from '../../public/icons/twitter.png';
import YoutubeIcon from '../../public/icons/youtube.png';
import InstagramIcon from '../../public/icons/instagram.png';
import FacebookIcon from '../../public/icons/facebook.png';
import AppStoreIcon from '../../public/icons/app-store.png';
import ChPlayIcon from '../../public/icons/ch-play.png';
import LogoWhite from '../../public/logo-white.png';
import Image from 'next/image';

const dataExplores = [
  { _id: 1, title: 'TheRaisedHands Live' },
  { _id: 2, title: 'Articles' },
  { _id: 3, title: 'Sitemap' },
  { _id: 4, title: 'Gifts' },
];

const dataAbouts = [
  { _id: 1, title: 'Carreers' },
  { _id: 2, title: 'Newsroom' },
  { _id: 3, title: 'Security' },
  { _id: 4, title: 'Privacy' },
  { _id: 5, title: 'Term' },
  { _id: 6, title: 'Social Impact' },
  { _id: 7, title: 'TheRaisedHands at Work' },
  { _id: 8, title: 'Support' },
];

const dataSocials = [
  { _id: 1, title: 'Twitter', icon: TwitterIcon },
  { _id: 2, title: 'Instagram', icon: InstagramIcon },
  { _id: 3, title: 'Facebook', icon: FacebookIcon },
  { _id: 4, title: 'YouTube', icon: YoutubeIcon },
];

const CustomTypography = styled(Typography)({
  color: '#fff',
  fontSize: '14px',
  padding: '12px 0',
  letterSpacing: '1px',
});

const Footer = () => {
  return (
    <Box sx={{ borderTop: '1px solid #303136' }}>
      <Container sx={{ display: 'flex', pb: 5, pt: 10 }}>
        <Grid container spacing={5}>
          <Grid item lg={3} md={3} xs={6}>
            <CustomTypography sx={{ opacity: '.6', fontWeight: 'bold', mb: 1 }}>
              Explore
            </CustomTypography>
            {dataExplores.map((item: any) => (
              <CustomTypography key={item._id}>{item.title}</CustomTypography>
            ))}
          </Grid>
          <Grid item lg={3} md={3} xs={6}>
            <CustomTypography sx={{ opacity: '.6', fontWeight: 'bold', mb: 1 }}>
              About
            </CustomTypography>
            {dataAbouts.map((item: any) => (
              <CustomTypography key={item._id}>{item.title}</CustomTypography>
            ))}
          </Grid>
          <Grid item lg={3} md={3} xs={6}>
            <CustomTypography sx={{ opacity: '.6', fontWeight: 'bold', mb: 1 }}>
              Social
            </CustomTypography>
            {dataSocials.map((item: any) => (
              <Box key={item._id} sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
                <Image
                  src={item.icon}
                  alt="icon"
                  height={24}
                  width={24}
                  style={{ objectFit: 'contain' }}
                />
                <CustomTypography sx={{ ml: 2 }}>{item.title}</CustomTypography>
              </Box>
            ))}
          </Grid>
          <Grid item lg={3} md={3} xs={6}>
            <CustomTypography sx={{ opacity: '.6', fontWeight: 'bold', mb: 1 }}>
              Download
            </CustomTypography>
            <Box sx={{ ml: -1 }}>
              <Box sx={{ width: '152px', height: '52px' }}>
                <Image
                  src={AppStoreIcon}
                  alt="icon"
                  style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                />
              </Box>
              <Box sx={{ width: '152px', height: '52px', mt: 1 }}>
                <Image
                  src={ChPlayIcon}
                  alt="icon"
                  style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ pb: 8, pt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: -3 }}>
          <Image src={LogoWhite} alt="logo" height={80} width={80} style={{ objectFit: 'cover' }} />
          <CustomTypography>© 2023 TheRaisedHands</CustomTypography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
