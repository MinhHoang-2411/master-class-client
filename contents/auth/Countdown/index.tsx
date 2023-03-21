import { useCountdown } from '../../../hooks/useCountdown';
import { ShowCounter } from './showCounter';
import '../../../styles/showcounter.module.scss';
import { removeSessionStorage } from '@/utils/auth';

interface CountdownTimer {
  targetDate: Date;
  session?: string;
}

const CountdownTimer = ({ targetDate, session = '' }: CountdownTimer) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const showCount = days + hours + minutes + seconds > 0;

  if (!showCount) {
    removeSessionStorage(session);
    return (
      <div className="mt-5">
        <p style={{ visibility: 'hidden' }}> </p>
      </div>
    );
  } else {
    return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />;
  }
};

export default CountdownTimer;
