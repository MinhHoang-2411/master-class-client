import { GifBoxSharp } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'next-i18next';
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookMessengerIcon,
} from 'react-share';
import { toast } from 'react-toastify';
import Typography from './Typography';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 400,
  p: 5,
  borderRadius: 4,
  backgroundColor: '#262626',
  color: '#fff',
  outline: '2px solid #ccc',
  '&:focus': {
    outline: '2px solid #ccc',
    boxShadow: 'none',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

interface IProps {
  isOpen: boolean;
  CloseModal: any;
  urlShare: string;
}
const ModalShareClasses = ({ isOpen, CloseModal, urlShare }: IProps) => {
  const { t } = useTranslation('common');
  const handleCopyUrl = () => {
    toast.success('Copied the link successfully');
  };

  return (
    <div>
      <Modal open={isOpen} onClose={CloseModal}>
        <Box sx={{ ...styleModal }}>
          <Box sx={{ position: 'absolute', top: 15, right: 15 }}>
            <IconButton onClick={CloseModal}>
              <CancelIcon color="warning" />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
            }}
          >
            <Typography
              component={'h4'}
              variant={'h6'}
              sx={{ fontSize: '26px', mt: 2, color: '#fff', textAlign: 'center' }}
            >
              {t('Share this class with your friends')}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 3,
            }}
          >
            <Box sx={{ mr: 2 }}>
              <FacebookShareButton url={urlShare}>
                <FacebookIcon size={42} round />
              </FacebookShareButton>
            </Box>
            <Box sx={{ mr: 2 }}>
              <FacebookMessengerShareButton url={urlShare} appId={process.env.NEXT_PUBLIC_FB_APP_ID || ""}>
                <FacebookMessengerIcon size={42} round />
              </FacebookMessengerShareButton>
            </Box>

            <Box sx={{ mr: 2 }}>
              <TwitterShareButton url={urlShare}>
                <TwitterIcon size={42} round />
              </TwitterShareButton>
            </Box>
            <Box>
              <LinkedinShareButton url={urlShare}>
                <LinkedinIcon size={42} round />
              </LinkedinShareButton>
            </Box>
          </Box>

          <Box
            sx={{
              backgroundColor: '#f1f1f1',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: '6px 12px',
              borderRadius: 1,
              mt: 5,
            }}
          >
            <Box>
              <Typography
                component={'h4'}
                variant={'h6'}
                sx={{
                  fontSize: '14px',
                  textAlign: 'center',
                  textTransform: 'lowercase',
                  fontWeight: 'normal',
                  color: '#7b7d80',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical',
                  cursor: 'not-allowed',
                  pointerEvents: 'all !important',
                }}
              >
                {urlShare}
              </Typography>
            </Box>
            <Box>
              <CopyToClipboard text={urlShare} onCopy={handleCopyUrl}>
                <Button sx={{ fontWeight: 'bold', fontSize: '14px', textTransform: 'capitalize' }}>
                  Copy
                </Button>
              </CopyToClipboard>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalShareClasses;
