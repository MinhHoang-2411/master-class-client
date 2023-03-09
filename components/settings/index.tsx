import { authActions } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { getAuth } from '@/utils/auth';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, Divider, Grid, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '../share/Typography';
interface Props {}
const SettingComponent = ({}: Props) => {
  const dispatch = useAppDispatch();
  const user = getAuth()?.user;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Stack spacing={3}>
            <Card sx={{ py: 2, px: 3.5 }}>
              <Typography variant="h6" component={'h2'}>
                {'Account'}
              </Typography>
              <Box sx={{ py: 2, my: 1 }}>
                <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" component={'h3'}>
                    {'Email'}
                  </Typography>
                </Box>
                <div className="">{user?.email}</div>
              </Box>
              <Divider sx={{ border: '.5px solid #D4D5D9' }} />
              <Box sx={{ py: 2, my: 1 }}>
                <Box
                  sx={{
                    my: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle1" component={'h3'}>
                    Password
                  </Typography>
                  <IconButton onClick={() => dispatch(authActions.openChangePassModal())}>
                    <EditIcon>Edit</EditIcon>
                  </IconButton>
                </Box>
                <div className="">••••••••</div>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingComponent;
