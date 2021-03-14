const formatHours = (hours: number): string => {
  if (hours === 12) {
    return '12PM';
  }
  if (hours === 0) {
    return '12AM';
  }
  if (hours < 12) {
    return `${hours}AM`;
  }
  return `${hours - 12}PM`;
};

export default formatHours;
