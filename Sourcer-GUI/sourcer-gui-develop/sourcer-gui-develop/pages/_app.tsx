import App, { AppContext, AppProps } from 'next/app';
import { useEffect } from 'react';
import { datadogRum } from '@datadog/browser-rum';
import { useNavbarEvents } from '@jobtarget/ui-library';
import Layout from './_layout';
import { PAGE_NAMES } from '../utils/enums';
import { SearchProvider } from '../context/Search';
import packageJson from '../package.json';
import '../styles/globals.css';

// dont run DataDog on localhost
if (process.env.NODE_ENV !== 'development') {
  datadogRum.init({
    allowedTracingUrls: [`${process.env.NEXT_PUBLIC_BASE_URL}`],
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID || '',
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || '',
    site: 'datadoghq.com',
    service: 'sourcer',
    env: process.env.NEXT_PUBLIC_DATADOG_ENV,
    version: packageJson.version,
    sampleRate: 100,
    sessionReplaySampleRate: 100,
    premiumSampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel: 'mask-user-input',
  });

  datadogRum.startSessionReplayRecording();
}

const AppRoot = ({ Component, ...rest }: AppProps) => {
  const details = useNavbarEvents();

  if (typeof window !== 'undefined') {
    require('jquery');
    require('bootstrap/dist/js/bootstrap');
  }

  // set the user for datadog tracking
  useEffect(() => {
    datadogRum.setUser({
      id: details.user_id,
      name: details.company?.companyName,
    });
  }, [details.company?.companyName, details.user_id]);

  return (
    <SearchProvider>
      <Layout {...{ Component, ...rest, ...details }}>
        <Component {...{ ...details, ...rest }} />
      </Layout>
    </SearchProvider>
  );
};

AppRoot.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  // if the route is empty or doesn't exist default to /search
  if (appContext.ctx.res?.statusCode === 404) {
    // get any incoming query params. We need to add a dummy host to help parse the params
    const query = new URL(`https://notfound.com/${appContext.router.asPath}`);

    // redirect to /search with the original query params
    appContext.ctx.res.writeHead(302, {
      Location: `${PAGE_NAMES.SEARCH}${query.search}`,
    });

    appContext.ctx.res.end();
    return;
  }

  return { ...appProps };
};

export default AppRoot;
