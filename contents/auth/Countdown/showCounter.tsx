import DateTimeDisplay from './dateTimeDisplay';
import styles from '../../../styles/showcounter.module.scss';

export interface ShowCounter {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const ShowCounter = (props: ShowCounter) => {
  const { days, hours, minutes, seconds } = props;
  return (
    <div className={`${styles['show-counter']}`}>
      <div className={`${styles['countdown-link']}`}>
        {/* <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        {days > 0 && <p>:</p>}
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        {hours > 0 && <p>:</p>} */}
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        {minutes > 0 && <p style={{ marginTop: 0, color: '#fff' }}>:</p>}
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      </div>
    </div>
  );
};
