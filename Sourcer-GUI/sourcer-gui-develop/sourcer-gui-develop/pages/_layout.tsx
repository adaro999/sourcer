import { PropsWithChildren, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { BannerAlert } from '../components/organisms/BannerAlert';
import { ErrorBoundary } from 'react-error-boundary';
import { Container, Spinner } from '@jobtarget/ui-library';
import { Error } from '../components/atoms/Error';
import { MoreMenu } from '../components/organisms/MoreMenu';
import { NavTabs } from '../components/molecules/NavTabs';
import { pushAnalyticsEvent } from '../utils/analytics';
import { SvgLoader } from '../components/atoms/SvgLoader';
import { IPageProps } from '../types/types';

const Layout = ({ children, recruiterId }: PropsWithChildren<IPageProps>) => {
  const { asPath } = useRouter();

  useEffect(() => {
    pushAnalyticsEvent.BrowserExtension('Browser Ext, Traffic');
  }, []);

  return (
    <div className="d-flex flex-column w-100" style={{ minHeight: '100vh' }}>
      <jt-navbar redirect={`${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`} stop-logout={process.env.NODE_ENV === 'development'} hide-classic="true" />
      <div className="flex-grow-1">
        <BannerAlert isHidden={true} message={'...'} />
        <Container>
          <Container.Header icon={<SvgLoader name="AppIcon" />} title="Sourcer">
            <MoreMenu />
          </Container.Header>
          <ErrorBoundary FallbackComponent={Error}>
            <Container.Body style={{ flex: '1 0 auto' }}>
              {!!recruiterId ? (
                <div>
                  <NavTabs />
                  {children}
                </div>
              ) : (
                <Spinner variant="xlarge" />
              )}
            </Container.Body>
          </ErrorBoundary>
          <Container.Footer />
        </Container>
      </div>
      <jt-footer />
      <Script src={process.env.NEXT_PUBLIC_ASSET_UI_THEME_JS}></Script>
      <Script src={process.env.NEXT_PUBLIC_ASSET_UI_KIT}></Script>
      <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY_GOOGLE_PLACES}&libraries=places`}></Script>
    </div>
  );
};

export default Layout;
