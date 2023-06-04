import { IAnalyticsEvent, WindowWithDataLayer } from './types';
import { IProfileQuery } from '../../hooks/useProfileCardController/types';

declare const window: WindowWithDataLayer;

const dataLayerPush = ({ args, eventName }: IAnalyticsEvent) => {
  if (typeof window !== 'undefined') {
    window.dataLayer.push({
      event: eventName,
      ...args,
    });
  }
};

/**
 * pushAnalyticsEvent - Utility wrapper for pushing GA Events to the DataLayer
 * @param eventName - The name of the event
 * @param args - An optional object containing further data for the event
 */
const pushAnalyticsEvent = (eventName: IAnalyticsEvent['eventName'], args?: IAnalyticsEvent['args']) => dataLayerPush({ args, eventName });

/**
 * BrowserExtension - Fires event only if url contains utm campaign from LinkedIn browser extension
 * @param eventName - The name of the event
 */
const BrowserExtension = (eventName: string) => {
  const urlParams = new URLSearchParams(window?.location?.search);
  const myParam = urlParams.get('utm_campaign');

  if (typeof window !== 'undefined' && myParam === 'LinkedIn Prompt') {
    dataLayerPush({ eventName });
  }
};

const AddIntegration = (type: string) => {
  if (type === 'ind') {
    dataLayerPush({ eventName: 'Indeed, Int.' });
  }

  if (type === 'cab') {
    dataLayerPush({ eventName: 'CAB, Int.' });
  }

  if (type === 'dic') {
    dataLayerPush({ eventName: 'DIC, Int.' });
  }
};

const CardClick = (profileId: string) => {
  if (profileId.startsWith('ind')) {
    dataLayerPush({ eventName: 'Indeed, Cards' });
  } else if (profileId.startsWith('cab')) {
    dataLayerPush({ eventName: 'CAB, Cards' });
  } else if (profileId.startsWith('dic')) {
    dataLayerPush({ eventName: 'DIC, Cards' });
  }
};

const Search = (id: string, cardStateQuery: IProfileQuery, totalResults: string) => {
  const props = { searchTerm: cardStateQuery.what, formName: `${cardStateQuery.form}Form`, results: totalResults };
  const validIntegrations = ['cab', 'dic', 'ind'];
  const integrationIndex = validIntegrations.indexOf(id.substring(0, 3).toLowerCase());
  const integration = integrationIndex >= 0 && { integration: validIntegrations[integrationIndex].toUpperCase().at(0) };

  dataLayerPush({ eventName: 'SearchForm', args: { ...props, ...integration } });
};

pushAnalyticsEvent.AddIntegration = AddIntegration;
pushAnalyticsEvent.BrowserExtension = BrowserExtension;
pushAnalyticsEvent.CardClick = CardClick;
pushAnalyticsEvent.Search = Search;

export { dataLayerPush, pushAnalyticsEvent };
