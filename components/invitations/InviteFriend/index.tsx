import Typography from '@/components/share/Typography';
import { Box } from '@mui/material';
import IconCopy from '@/public/icons/copy.svg';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const InviteFriend = () => {
  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ background: '#232627', p: 5, borderRadius: '16px' }}>
        <Typography component={'h2'} variant={'h6'} sx={{ color: '#fff', fontSize: '18px' }}>
          Link
        </Typography>

        <Typography
          component={'h2'}
          variant={'body2'}
          sx={{ color: '#6C7275', fontSize: '14px', mt: 0.5, lineHeight: 1.8, letterSpacing: 0.2 }}
        >
          Use the link below in your promotion campaigns or on your blog to refer users to
          MasterClass. Our system will track all signups from the invitations and credit you with
          free bonus maps accordingly. You can find more links as well as promotional media in the
          Banner Wizard.
        </Typography>

        <Box sx={{ mt: 2, display: 'flex' }}>
          <Typography
            component={'h2'}
            variant={'body2'}
            sx={{
              color: '#FFEA7C',
              fontSize: '14px',
              lineHeight: 1.8,
              letterSpacing: 0.2,
            }}
          >
            Share link:
          </Typography>
          <Typography
            component={'h2'}
            variant={'body2'}
            sx={{
              color: '#A6A9B9',
              fontSize: '14px',
              ml: 0.5,
              mr: 1.3,
              lineHeight: 1.8,
              letterSpacing: 0.2,
            }}
          >
            www.mindmeister.com/?r=1160316
          </Typography>
          <Box sx={{ cursor: 'pointer' }}>
            <CopyToClipboard text={'www.mindmeister.com/?r=1160316'}>
              <Image src={IconCopy} alt={`icon`} width={20} height={20} />
            </CopyToClipboard>
          </Box>
        </Box>
      </Box>
      <Box sx={{ background: '#232627', p: 5, borderRadius: '16px', mt: 1.5 }}>
        <Typography component={'h2'} variant={'h6'} sx={{ color: '#fff', fontSize: '18px' }}>
          Share & Invite
        </Typography>

        <Typography
          component={'h2'}
          variant={'body2'}
          sx={{ color: '#6C7275', fontSize: '14px', mt: 0.5, lineHeight: 1.8, letterSpacing: 0.2 }}
        >
          Share your affiliate link with your Facebook or Google+ contacts, tweet it out your
          followers or invite friends via email to join MindMeister. You will receive a free map
          reward on signup.
        </Typography>
      </Box>
    </Box>
  );
};

export default InviteFriend;
