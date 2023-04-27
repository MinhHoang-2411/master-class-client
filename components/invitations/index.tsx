import { displayCenter } from '@/declares/modal';
import { Box, Container } from '@mui/material';
import React, { useState } from 'react';
import Button from '../share/Button';
import Typography from '../share/Typography';
import Commission from './Commission';
import InviteFriend from './InviteFriend';

interface IInvitationsComponent {
  lesson?: any;
}

const InvitationsComponent = ({ lesson }: IInvitationsComponent) => {
  const [tabState, setTabState] = useState(0); // 0 = tab friend || 1 = tab commission

  const tabStyleActive = {
    border: '1px solid #fff',
    p: '12px 24px',
    borderRadius: '24px',
    background: 'linear-gradient(94.87deg, #FFB7E4 20.12%, #34DBEB 87.72%)',
    color: '#262626',
    borderColor: 'transparent',
    cursor: 'pointer',
  };

  const tabStyleNormal = {
    border: '1px solid #fff',
    p: '12px 24px',
    borderRadius: '24px',
    color: '#6C7275',
    backgroundColor: 'transparent',
    borderColor: '#6C7275',
    cursor: 'pointer',
  };

  return (
    <Container>
      <Box sx={{ px: 16 }}>
        <Box sx={{ pt: 3 }}>
          <Typography component={'h6'} variant={'body2'} sx={{ color: '#A6A9B9' }}>
            Invitations
          </Typography>
          <Typography component={'h2'} variant={'h6'} sx={{ color: '#fff', fontSize: '26px' }}>
            {lesson?.name}
          </Typography>
        </Box>
        <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center' }}>
          <Box>
            <Button
              sx={tabState === 0 ? tabStyleActive : tabStyleNormal}
              onClick={() => setTabState(0)}
            >
              Invite Friends
            </Button>
          </Box>
          <Box sx={{ ml: 1.5 }}>
            <Button
              sx={tabState === 1 ? tabStyleActive : tabStyleNormal}
              onClick={() => setTabState(1)}
            >
              My Commission
            </Button>
          </Box>
        </Box>

        {tabState === 0 ? <InviteFriend /> : <Commission />}
      </Box>
    </Container>
  );
};

export default InvitationsComponent;
