interface IContactItems {
  icon: string;
  info?: (string | undefined)[];
  title: string;
}

interface IContactInformation {
  isEnriched?: boolean;
  items: IContactItems[];
  isOpen?: boolean;
}

export type { IContactInformation, IContactItems };
