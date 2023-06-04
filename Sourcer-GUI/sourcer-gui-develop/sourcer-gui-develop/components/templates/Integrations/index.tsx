import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Row } from 'reactstrap';
import { Spinner } from '@jobtarget/ui-library';
import { IntegrationsCard } from '../../molecules/IntegrationsCard';
import { authorizeCab, authorizeDice, authorizeIndeed, connectIntegration, disconnectIntegration, getIntegrationsForRecruiter } from '../../../api';
import { IntegrationCards } from '../../../pages/api/integrations/getIntegrationsForRecruiter/types';
import { IIntegration } from './types';
import { IPageProps } from '../../../types/types';
import { IIntegrationsCard } from '../../molecules/IntegrationsCard/types';
import { pushAnalyticsEvent } from '../../../utils/analytics';

const IntegrationsTemplate = ({ company, jtToken, recruiterId }: IPageProps) => {
  const [integrations, setIntegrations] = useState<IntegrationCards[]>([]);
  const [cards, setCards] = useState<IIntegration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/integrations`;

  const cardsArr: IIntegration[] = useMemo(
    () => [
      {
        connected: false,
        type: 'cab',
        image: 'CareerBuilder',
        title: 'Career Builder',
        url: process.env.NEXT_PUBLIC_API_CAB_AUTH_URL,
      },
      {
        connected: false,
        type: 'dic',
        image: 'Dice',
        title: 'Dice',
        url: process.env.NEXT_PUBLIC_API_DICE_AUTH_URL,
      },
      {
        connected: false,
        type: 'ind',
        image: 'Indeed',
        title: 'Indeed',
        url: process.env.NEXT_PUBLIC_API_IND_AUTH_URL,
      },
    ],
    [],
  );

  const connectIndeed = useCallback(
    (code: string, employer: string, state: string) => {
      authorizeIndeed({ state, code, employer, token: jtToken || '' }).then(() => {
        // refresh  cards
        getIntegrationsForRecruiter({ token: jtToken || '' }).then(cdata => {
          if (cdata) {
            setIntegrations(cdata);
          }
        });
      });
    },
    [jtToken],
  );

  const connectDice = useCallback(
    (email: string, password: string) => {
      authorizeDice({ email, password, token: jtToken || '' }).then(() => {
        // refresh  cards
        getIntegrationsForRecruiter({ token: jtToken || '' }).then(cdata => {
          if (cdata) {
            setIntegrations(cdata);
          }
        });
      });
    },
    [jtToken],
  );

  const connectCab = useCallback(
    (code: string) => {
      authorizeCab({ code, token: jtToken || '' }).then(() => {
        // refresh  cards
        getIntegrationsForRecruiter({ token: jtToken || '' }).then(cdata => {
          if (cdata) {
            setIntegrations(cdata);
          }
        });
      });
    },
    [jtToken],
  );

  const connectSource = useCallback(
    (type: string, access_token: string, refresh_token: string) => {
      // connect
      connectIntegration({
        integration_type: type,
        access_token,
        refresh_token,
        token: jtToken || '',
      }).then(() => {
        // refresh  cards
        getIntegrationsForRecruiter({ token: jtToken || '' }).then(data => {
          if (data) {
            setIntegrations(data);
          }
        });
      });
    },
    [jtToken],
  );

  const disconnectSource = (type: string) => {
    // disconnect
    disconnectIntegration({
      integration_type: type,
      token: jtToken || '',
    }).then(() => {
      // refresh cards
      getIntegrationsForRecruiter({ token: jtToken || '' }).then(data => {
        if (data) {
          setIntegrations(data);
        }
      });
    });
  };

  const handleConnection: IIntegrationsCard['handleConnection'] = async (connect, type, url) => {
    if (connect) {
      if (type === 'dic') {
        const data = await getIntegrationsForRecruiter({ token: jtToken || '' });
        if (data) setIntegrations(data);
      } else {
        // open new window with source url and redirect param
        const redirectState = `${recruiterId}_${company?.companyId}`;
        const redirectUri = encodeURIComponent(`${redirectUrl}/${type}`);
        const connectUrl = `${url}&state=${redirectState}&redirect_uri=${redirectUri}`;
        window.open(connectUrl, '_blank');
      }
      pushAnalyticsEvent.AddIntegration(type);
    } else {
      disconnectSource(type);
    }
  };

  useEffect(() => {
    // for redirects with integration type in the url
    const { type } = router.query;
    if (type) {
      // check integration type
      if (type == 'ind') {
        const { code, employer, state } = router.query;
        if (code && employer && state) {
          connectIndeed(code.toString(), employer.toString(), state.toString());
        }
      } else if (type == 'dic') {
        // if tokens exist in url, connect integration
        const { email, password } = router.query;
        if (email && password) {
          connectDice(email?.toString(), password?.toString());
        }
      } else if (type == 'cab') {
        const { code } = router.query;
        if (code) {
          connectCab(code?.toString());
        }
      }
    } else {
      // if not a redirect, get integration data for recruiter
      getIntegrationsForRecruiter({ token: jtToken || '' }).then(data => {
        if (data) {
          setIntegrations(data);
        }
      });
    }
  }, [connectCab, connectDice, connectIndeed, connectSource, jtToken, router.query]);

  useEffect(() => {
    // update connected status for each card
    setCards(() => cardsArr.map(({ type, ...rest }) => ({ ...rest, connected: integrations?.some(({ integration_type }) => integration_type === type), type })));
    setIsLoading(false);
  }, [cardsArr, integrations]);

  return (
    <>
      <h2>Integrations</h2>
      <p>JobTarget Sourcer allows you to centralize all of your resume banks into one search experience</p>
      <Row>
        {!isLoading ? (
          <>
            {cards.map((elm, index) => (
              <Col sm={6} key={index} className="mb-2">
                <IntegrationsCard {...elm} handleConnection={handleConnection} jtToken={jtToken} />
              </Col>
            ))}
          </>
        ) : (
          <Spinner variant="xlarge" />
        )}
      </Row>
    </>
  );
};

export { IntegrationsTemplate };
