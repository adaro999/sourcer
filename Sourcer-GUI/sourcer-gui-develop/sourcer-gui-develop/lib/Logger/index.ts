import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

datadogLogs.init({
  clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || '',
  site: 'sourcer',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
});

/**
 * Logger - Wrapper for sending custom errors to DataDog
 * @param obj.error - The exception that was thrown along with anything else you want to add
 * @param obj.message - A simple message of what error just happened
 */
const Logger = ({ error, message }: { error: string | unknown; message: string | unknown }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (process.env.NODE_ENV === 'production') {
    datadogLogs.logger.error(`${message}`, { ...(error as object) });
    datadogRum.addError(error, {
      message,
    });
    return null;
  }

  // eslint-disable-next-line no-console
  console.warn({ error, message });
  return { error, message };
};

/**
 * Logger.Info - Wrapper for sending custom events to DataDog
 * @param obj.event - A simple message of what event just happened
 * @param obj.payload - An object of data to send to DataDog
 */
const Info = ({ event, payload }: { event: string; payload: Record<string, unknown> }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (process.env.NODE_ENV === 'production') {
    datadogRum.addAction(event, payload);
    return null;
  } else {
    // eslint-disable-next-line no-console
    console.log({ event, payload });
  }

  return { event, payload };
};

Logger.Info = Info;

export { Logger };
