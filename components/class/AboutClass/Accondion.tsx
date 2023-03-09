import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, duration } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useTranslation } from 'next-i18next';
import styles from './../../../styles/classes.module.scss';

const CustomAccordion = styled(Accordion)({
  backgroundColor: '#303136',
  color: '#fff',
  boxShadow: 'none',
  '&::before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
  },
});

const CustomAccordionSummary = styled(AccordionSummary)({
  backgroundColor: '#303136',
  borderBottom: '1px solid #303136',
  marginBottom: -1,
  '& .MuiAccordionSummary-content': {
    margin: '16px 0',
  },
  fontSize: '14px',
});

const CustomAccordionDetails = styled(AccordionDetails)({
  padding: '0px 16px 12px',
  fontSize: '14px',
});

interface CustomAccordionProps {
  title: string;
  index: number;
  description: string;
  duration: number;
}

const displayDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const remainingSeconds = duration - hours * 3600 - minutes * 60;
  return `${hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const AccordionComponent: React.FC<CustomAccordionProps> = ({
  title,
  description,
  index,
  duration,
}) => {
  const { t } = useTranslation('common');
  return (
    <Box className={styles.accordionLesson}>
      <CustomAccordion>
        <CustomAccordionSummary
          expandIcon={<ExpandMore sx={{ color: '#fff' }} />}
          sx={{
            borderRadius: '5px',
          }}
        >
          {`${index + 1}. ${title}`}
        </CustomAccordionSummary>

        <Box sx={{ border: '1px solid #303136' }}>
          <CustomAccordionDetails>{displayDuration(Math.floor(duration))}</CustomAccordionDetails>
          <CustomAccordionDetails>{description}</CustomAccordionDetails>

          <CustomAccordionDetails>
            <Box sx={{ textDecoration: 'underline' }}>{`${t('read-more')}...`}</Box>
          </CustomAccordionDetails>
        </Box>
      </CustomAccordion>
    </Box>
  );
};

export default AccordionComponent;
