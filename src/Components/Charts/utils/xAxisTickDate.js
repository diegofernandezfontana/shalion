const xAxisTickDate = date => {
  const convertedDate = date.slice(8, 10) + '/' + date.slice(5, 7);

  return convertedDate;
};

export default xAxisTickDate;
