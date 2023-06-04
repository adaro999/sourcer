import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const stringifyTimePassedDetails = (sourceUpdatedOnString: string, toDate?: string) => {
  const currentDateTime = toDate ? dayjs(toDate) : dayjs();
  const profileUpdatedDateTime = sourceUpdatedOnString;
  const profileLastUpdatedOn = dayjs(profileUpdatedDateTime);
  const durationBetweenLastUpdateAndCurrentDate = dayjs.duration(currentDateTime.diff(profileLastUpdatedOn));
  const monthsPassed = durationBetweenLastUpdateAndCurrentDate.months();
  const weeksPassed = durationBetweenLastUpdateAndCurrentDate.weeks();
  const daysPassed = durationBetweenLastUpdateAndCurrentDate.days();
  const hoursPassed = durationBetweenLastUpdateAndCurrentDate.hours();
  const minutesPassed = durationBetweenLastUpdateAndCurrentDate.minutes();
  const monthString = 'month';
  const weekString = 'week';
  const dayString = 'day';
  const hourString = 'hour';
  const minuteString = 'minute';
  let timePassed;
  let timeDescription;

  const pluralize = (elapsedTime: number) => (elapsedTime > 1 ? 's' : '');

  if (monthsPassed) {
    if (monthsPassed > 6) return;
    timeDescription = monthString + pluralize(monthsPassed);
    timePassed = monthsPassed;
  } else if (weeksPassed && weeksPassed <= 3) {
    timeDescription = weekString + pluralize(weeksPassed);
    timePassed = weeksPassed;
  } else if (daysPassed) {
    timeDescription = dayString + pluralize(daysPassed);
    timePassed = daysPassed;
  } else if (hoursPassed) {
    timeDescription = hourString + pluralize(hoursPassed);
    timePassed = hoursPassed;
  } else if (minutesPassed) {
    timeDescription = minuteString + pluralize(minutesPassed);
    timePassed = minutesPassed;
  }

  return `${timePassed} ${timeDescription}`;
};

export { stringifyTimePassedDetails };
