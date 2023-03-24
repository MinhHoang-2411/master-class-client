export const convertTimeStamp = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000); // convert from seconds to milliseconds
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() trả về giá trị từ 0 đến 11, nên cần +1 để lấy giá trị đúng của tháng
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
