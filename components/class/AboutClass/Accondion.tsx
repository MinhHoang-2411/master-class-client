import Typography from '@/components/share/Typography';
import { classActions } from '@/store/class/classSlice';
import { useAppDispatch } from '@/store/hooks';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
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
  backgroundColor: '#fff',
  borderBottom: '1px solid #303136',
  color: 'rgba(44, 44, 44, 1)',
  marginBottom: -1,
  '& .MuiAccordionSummary-content': {
    margin: '16px 0',
  },
  fontSize: '14px',
});

const CustomAccordionDetails = styled(AccordionDetails)({
  backgroundColor: '#fff',
  color: 'rgba(44, 44, 44, 1)',
  padding: '0px 16px 12px',
  fontSize: '14px',
});

interface CustomAccordionProps {
  lessonId: string;
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
  lessonId,
  title,
  description,
  index,
  duration,
}) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const RedirectLessonDetail = () => {
    dispatch(classActions.setIndexSelectedLesson(index));
    router.push(`${router.asPath}/lessons/${lessonId}`);
  };

  return (
    <Box className={styles.accordionLesson}>
      <CustomAccordion>
        <CustomAccordionSummary
          expandIcon={<ExpandMore sx={{ color: 'rgba(44, 44, 44, 1)' }} />}
          sx={{
            borderRadius: '5px',
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: '14px',
              padding: 0,
              maxWidth: { lg: '300px', md: '200px' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >{`${index + 1}. ${title}`}</Typography>
        </CustomAccordionSummary>

        <Box sx={{ border: '1px solid #303136' }}>
          <CustomAccordionDetails>{displayDuration(Math.floor(duration))}</CustomAccordionDetails>
          <CustomAccordionDetails>{description}</CustomAccordionDetails>

          <CustomAccordionDetails sx={{ borderRadius: '0 0 5px 5px' }}>
            <Button
              sx={{
                textDecoration: 'underline',
                color: 'rgba(44, 44, 44, 1)',
                textTransform: 'capitalize',
                p: 0,
                '&:hover': {
                  background: '#e7e7e7',
                },
              }}
              onClick={RedirectLessonDetail}
            >{`${t('read-more')}...`}</Button>
          </CustomAccordionDetails>
        </Box>
      </CustomAccordion>
    </Box>
  );
};

export default AccordionComponent;
