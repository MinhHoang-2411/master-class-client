import { useAppSelector } from '@/store/hooks';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Button from '../share/Button';
import PrimaryButton from '../share/PrimaryButton';

interface Props {
  myWatching: any;
  onShowAll: any;
  params: any;
}

const styleTypogaphy = {
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '1',
  WebkitBoxOrient: 'vertical',
};

const styleAbsolute = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
};

const styleBtnSignUp = {
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'capitalize',
  '&:disabled': {
    color: '#fff',
    backgroundColor: '#a0a0a0',
  },
  color: '#262626',
  background: 'linear-gradient(94.87deg, #FFB7E4 20.12%, #34DBEB 87.72%)',
  borderRadius: '100px',
  mt: 1,
  transition: 'all .4s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 15px 0 rgba(236, 116, 149, 0.75)',
  },
};

const WatchedComponent = ({ myWatching, onShowAll, params }: Props) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const totalPage = useAppSelector((state) => state.watching.totalPage);

  const ProcessTotalLesson = (totalWatching: number, totalLesson: number) => {
    return (totalWatching / totalLesson) * 100;
  };

  const onRedirectLesson = (lesson: any) => {
    const NormalizeWebName = (webName: string) => {
      const str = webName.replace(/\s+/g, ' ');
      const lowerCase = str.toLocaleLowerCase();
      const diacritics = lowerCase.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const prepareString = diacritics.replaceAll(' ', '-');
      return prepareString;
    };
    const webName = NormalizeWebName(lesson?.authorName?.trim() + ' ' + lesson?.name?.trim());
    router.push(`/classes/${webName}/lessons/${lesson?.lessons?.id}`);
  };

  return (
    <>
      <Grid container spacing={4} sx={{ mt: 0.5 }}>
        {myWatching?.map((lesson: any) => (
          <Grid item key={lesson?.id} xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#1e1e2d', color: '#fff' }}>
              <Box sx={{ p: 2.5, pb: 3, display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{ pr: 2 }}>
                  <Avatar
                    src={
                      'http://103.92.29.62:8094/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.814a317f.png&w=256&q=75'
                    }
                    alt="avatar"
                    variant="square"
                    sx={{ width: 72, height: 72, borderRadius: 0.5 }}
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ ...styleTypogaphy }} component="p">
                    {lesson?.authorName}
                  </Typography>

                  <Typography sx={{ ...styleTypogaphy, fontSize: '13px' }} component="p">
                    {lesson?.title}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                    <Box sx={{ display: 'inline-block', mr: 0.5, flex: 1 }}>
                      <Typography
                        sx={{ fontSize: '13px', fontWeight: 'bold' }}
                      >{`${lesson?.totalWatching}/${lesson?.totalLesson}`}</Typography>
                    </Box>
                    <Box sx={{ flex: 5 }}>
                      <LinearProgress
                        variant="determinate"
                        value={ProcessTotalLesson(lesson?.totalWatching, lesson?.totalLesson)}
                        sx={{
                          backgroundColor: '#707070',
                          '& .MuiLinearProgress-barColorPrimary': {
                            backgroundColor: '#fff',
                          },
                          borderRadius: '2px',
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(48, 49, 54, .2)',
                  },
                }}
              >
                <CardMedia
                  component="video"
                  height="230px"
                  src={lesson.lessons.videoUrl}
                  sx={{ maxHeight: '230px', objectFit: 'cover' }}
                />

                <Box
                  sx={{
                    ...styleAbsolute,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    pb: 2.5,
                  }}
                >
                  <Box sx={{ pr: 2.5, flex: 1 }}>
                    <Typography variant="body2" sx={{ ...styleTypogaphy, WebkitLineClamp: '2' }}>
                      {lesson.lessons.title}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button sx={{ ...styleBtnSignUp }} onClick={() => onRedirectLesson(lesson)}>
                      <PlayArrowIcon sx={{ marginRight: 0.8, height: '20px' }} />
                      {t('Resume')}
                    </Button>
                  </Box>
                  {/* <Box sx={{ ...styleAbsolute }}>
                    <LinearProgress
                      variant="determinate"
                      value={12}
                      sx={{
                        '& .MuiLinearProgress-barColorPrimary': {
                          backgroundColor: '#e32652',
                        },
                        height: '2px',
                      }}
                    />
                  </Box> */}
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2.5} sx={{ mt: 3, mb: 5 }}>
        <Grid item xs={12} sm={12} md={12}>
          {totalPage === params.page ? (
            <></>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={onShowAll}
                sx={{
                  color: '#fff',
                  padding: '13px 30px',
                  minWidth: '232px',
                  backgroundColor: '#1e1e2d',
                  borderRadius: '8px',
                  letterSpacing: '1px',
                  '&:hover': {
                    backgroundColor: '#33333f',
                  },
                }}
              >
                {t('Show more')}
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default WatchedComponent;
