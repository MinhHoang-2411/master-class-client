export const convertTimeStamp = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000); // convert from seconds to milliseconds
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() trả về giá trị từ 0 đến 11, nên cần +1 để lấy giá trị đúng của tháng
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const convertTimeStampToString = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000); // convert from seconds to milliseconds
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() trả về giá trị từ 0 đến 11, nên cần +1 để lấy giá trị đúng của tháng
  let monthString = '';
  switch (month) {
    case 1:
      monthString = 'Jan';
      break;
    case 2:
      monthString = 'Feb';
      break;
    case 3:
      monthString = 'Mar';
      break;
    case 4:
      monthString = 'Apr';
      break;
    case 5:
      monthString = 'May';
      break;
    case 6:
      monthString = 'Jun';
      break;
    case 7:
      monthString = 'Jul';
      break;
    case 8:
      monthString = 'Aug';
      break;
    case 9:
      monthString = 'Sep';
      break;
    case 10:
      monthString = 'Oct';
      break;
    case 11:
      monthString = 'Nov';
      break;
    case 12:
      monthString = 'Dec';
      break;
    default:
      break;
  }
  const formattedDate = `${monthString} ${day}`;
  return formattedDate;
};
