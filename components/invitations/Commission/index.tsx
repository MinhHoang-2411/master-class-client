import Typography from '@/components/share/Typography';
import {
  Box,
  Checkbox,
  Grid,
  makeStyles,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import noteIcon from '@/public/icons/noteIcon.svg';
import Image from 'next/image';
import PrimaryButton from '@/components/share/PrimaryButton';

const InviteFriend = () => {
  //table
  function createData(currency: string, paid: number, notPaid: number) {
    return { currency, paid, notPaid };
  }

  const rows = [
    createData('USD', 0, 1000),
    createData('USD', 0, 1000),
    createData('USD', 0, 1000),
    createData('USD', 0, 1000),
    createData('USD', 0, 1000),
  ];

  const StyledTableCellWhite = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: '14px',
      fontWeight: 500,
      padding: '10px 0',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '12px',
      padding: '20px 0',
    },

    color: 'white',
    borderBottom: '1.5px solid #343839',
  }));

  const StyledTableCellWhiteNoBorder = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: '14px',
      fontWeight: 500,
      padding: '10px 0',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '14px',
      padding: '20px 0',
    },
    borderBottom: 'none',
    color: 'white',
  }));

  const StyledTableCellGray = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: '14px',
      fontWeight: 500,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '12px',
      padding: '20px 0',
    },
    color: 'rgba(108, 114, 117, 1)',
    padding: 0,
    borderBottom: '1.5px solid #343839',
  }));

  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ background: '#232627', p: 5, borderRadius: '16px' }}>
        <Typography
          component={'h2'}
          variant={'body2'}
          sx={{ color: '#6C7275', fontSize: '14px', mt: 0.5, lineHeight: 1.8, letterSpacing: 0.2 }}
        >
          On this page you can monitor the status of your invitations and track your commission.
          You’ll receive a 20% commission on each invited friend who converts to a paid plan at any
          point in time. To optimize your results, use our Banner Wizard to promote MindMeister on
          your website or blog.
        </Typography>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            borderRadius: '12px',
            bgcolor: 'rgba(255, 248, 233, 0.1)',
            p: '8px 14px',
          }}
        >
          <Image src={noteIcon} alt={`icon`} width={20} height={20} />
          <Typography
            component={'h2'}
            variant={'body2'}
            sx={{
              ml: '13px',
              color: '#FFEA7C',
              fontSize: '14px',
              lineHeight: 1.8,
              letterSpacing: 0.2,
            }}
          >
            Note: By using Meister’s Partner Programs, you agree to the program’s terms and
            conditions.
          </Typography>
        </Box>
        <Grid container sx={{ mt: '20px' }} spacing={2}>
          <Grid item xs={4}>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ border: '1.5px solid #343839', borderRadius: '15px', p: '20px 0' }}
            >
              <Typography sx={{ fontSize: '14px', color: '#A6A9B9' }}>Signups</Typography>
              <Typography sx={{ fontSize: '24px', color: '#FFEA7C', fontWeight: '600' }}>
                318
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ border: '1.5px solid #343839', borderRadius: '15px', p: '20px 0' }}
            >
              <Typography sx={{ fontSize: '14px', color: '#A6A9B9' }}>Paid Upgrades</Typography>
              <Typography sx={{ fontSize: '24px', color: '#FFEA7C', fontWeight: '600' }}>
                318
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ border: '1.5px solid #343839', borderRadius: '15px', p: '20px 0' }}
            >
              <Typography sx={{ fontSize: '14px', color: '#A6A9B9' }}>Commission</Typography>
              <Typography sx={{ fontSize: '24px', color: '#FFEA7C', fontWeight: '600' }}>
                318
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ background: '#232627', p: 5, borderRadius: '16px', mt: 1.5 }}>
        <Typography component={'h2'} variant={'h6'} sx={{ color: '#fff', fontSize: '18px' }}>
          Commission Table
        </Typography>

        <TableContainer sx={{ mt: '10px' }}>
          <Table
            sx={{
              minWidth: 650,
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCellWhite>Currency</StyledTableCellWhite>
                <StyledTableCellWhite>Paid</StyledTableCellWhite>
                <StyledTableCellWhite>Not Paid</StyledTableCellWhite>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <StyledTableCellGray component="th" scope="row">
                    {row.currency}
                  </StyledTableCellGray>
                  <StyledTableCellWhite>{row.paid}</StyledTableCellWhite>
                  <StyledTableCellGray>{row.notPaid}</StyledTableCellGray>
                </TableRow>
              ))}
              <TableRow style={{ borderBottom: 'none' }}>
                <StyledTableCellWhiteNoBorder component="th" scope="row">
                  TOTAL
                </StyledTableCellWhiteNoBorder>
                <StyledTableCellWhiteNoBorder>0</StyledTableCellWhiteNoBorder>
                <StyledTableCellWhiteNoBorder>0</StyledTableCellWhiteNoBorder>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          component={'h2'}
          variant={'body2'}
          sx={{
            color: '#6C7275',
            fontSize: '14px',
            mt: 0.5,
            lineHeight: 1.8,
            letterSpacing: 0.2,
          }}
        >
          Once your commission has reached EUR 219, you can request a payout via PayPal. To do this,
          please provide your PayPal address and then use the button below to automatically request
          a payout. Alternatively an invoice can be sent to{' '}
          <span style={{ color: 'rgba(255, 234, 124, 1)' }}>tranthuy.nute@gmail.com</span>
        </Typography>

        <Box
          sx={{
            mt: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '32px',
            bgcolor: 'rgba(255, 248, 233, 0.1)',
            p: '8px 14px',
          }}
        >
          <Typography
            component={'h2'}
            variant={'body2'}
            sx={{
              ml: '13px',
              color: 'rgba(166, 169, 185, 1)',
              fontSize: '14px',
              lineHeight: 1.8,
              letterSpacing: 0.2,
            }}
          >
            https://www.mindmeister.com/?r=1160316
          </Typography>
          <PrimaryButton
            style={{ background: 'white', '&:hover': { background: 'white' }, mt: 0, px: '40px' }}
          >
            Save
          </PrimaryButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px' }}>
          <Checkbox
            sx={{
              color: 'rgba(255, 234, 124, 1)',
              '&.Mui-checked': {
                color: 'rgba(255, 234, 124, 1)',
              },
              '&.MuiCheckbox-root': {
                padding: 0,
              },
            }}
            defaultChecked
          />
          <Typography sx={{ ml: '5px', fontSize: '14px', color: 'rgba(254, 254, 254, 1)' }}>
            {' '}
            Notify me via email as soon as I’ve reached EUR 129
          </Typography>
        </Box>
        <Box sx={{ mt: '40px' }}>
          <PrimaryButton>Request Payout</PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};

export default InviteFriend;
