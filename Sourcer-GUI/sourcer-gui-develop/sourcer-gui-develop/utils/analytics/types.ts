type WindowWithDataLayer = Window & {
  dataLayer: Record<string, unknown>[];
};

interface IAnalyticsEvent {
  eventName: string;
  args?: Record<string, unknown>;
}

export type { IAnalyticsEvent, WindowWithDataLayer };
