export function getRelativeTime(date: Date) {
  const TIME_UNITS = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ] as const;
  const TIME_UNIT_SECONDS = [
    60,
    3600,
    86400,
    604800,
    2592000,
    31536000,
    Infinity,
  ] as const;

  const timeMs = date.getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
  const unitIndex = TIME_UNIT_SECONDS.findIndex(
    (timeUnitSecond) => timeUnitSecond > Math.abs(deltaSeconds)
  );

  const divisor = unitIndex ? TIME_UNIT_SECONDS[unitIndex - 1] : 1;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  try {
    return rtf.format(
      Math.floor(deltaSeconds / divisor),
      TIME_UNITS[unitIndex]
    );
  } catch (error) {
    console.error(error);
    return "Error parsing date";
  }
}
