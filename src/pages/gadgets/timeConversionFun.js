// 天转换为其他单位
function convertDays(days) {
  const seconds = days * 24 * 60 * 60;
  const milliseconds = seconds * 1000;
  const minutes = seconds * 60;
  const hours = days * 24;
  const weeks = days / 7;
  const years = days / 365;
  return {
    seconds: seconds,
    milliseconds: milliseconds,
    minutes: minutes,
    hours: hours,
    days: days,
    weeks: weeks,
    years: years
  };
}

// 小时转换为其他单位
function convertHours(hours) {
  const seconds = hours * 60 * 60;
  const milliseconds = seconds * 1000;
  const minutes = hours * 60;
  const days = hours / 24;
  const weeks = days / 7;
  const years = days / 365;
  return {
    seconds: seconds,
    milliseconds: milliseconds,
    minutes: minutes,
    hours: hours,
    days: days,
    weeks: weeks,
    years: years
  };
}

// 分钟转换为其他单位
function convertMinutes(minutes) {
  const seconds = minutes * 60;
  const milliseconds = seconds * 1000;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const years = days / 365;
  return {
    seconds: seconds,
    milliseconds: milliseconds,
    minutes: minutes,
    hours: hours,
    days: days,
    weeks: weeks,
    years: years
  };
}

// 秒转换为其他单位
function convertSeconds(seconds) {
  const milliseconds = seconds * 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const years = days / 365;
  return {
    seconds: seconds,
    milliseconds: milliseconds,
    minutes: minutes,
    hours: hours,
    days: days,
    weeks: weeks,
    years: years
  };
}

// 毫秒转换为其他单位
function convertMilliseconds(milliseconds) {
  const seconds = milliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const years = days / 365;
  return {
    seconds: seconds,
    milliseconds: milliseconds,
    minutes: minutes,
    hours: hours,
    days: days,
    weeks: weeks,
    years: years
  };
}

// 年转换为其他单位
function convertYears(years) {
  const days = years * 365;
  const hours = days * 24;
  const minutes = hours * 60;
  const seconds = minutes * 60;
  const milliseconds = seconds * 1000;
  const weeks = days / 7;
  return {
    seconds: seconds,
    milliseconds: milliseconds,
    minutes: minutes,
    hours: hours,
    days: days,
    weeks: weeks,
    years: years
  };
}
// 星期转换为其他单位
function convertWeeks(weeks) {
  const days = weeks * 7;
  const hours = days * 24;
  const minutes = hours * 60;
  const seconds = minutes * 60;
  const milliseconds = seconds * 1000;
  const years = days / 365;
  return {
    seconds: seconds,
    milliseconds: milliseconds,
    minutes: minutes,
    hours: hours,
    days: days,
    years: years
  };
}

export {convertHours, convertDays, convertMilliseconds, convertMinutes, convertSeconds, convertYears, convertWeeks}
