import styles from '../../../styles/showcounter.module.scss';

export interface DateTimeDisplay {
  value: number;
  type: string;
  isDanger: boolean;
}

const DateTimeDisplay = (props: DateTimeDisplay) => {
  const { value, type, isDanger } = props;
  return (
    <>
      {value >= 0 && (
        <div className={isDanger ? `${styles.countdown} ${styles.danger}` : `${styles.countdown}`}>
          <p>{value}</p>
          <span>{type}</span>
        </div>
      )}
    </>
  );
};

export default DateTimeDisplay;
