import CryptoJS from 'crypto-js';
import { ICard } from '../pages/api/profiles/getProfiles/types';

const secretKey = process.env.NEXT_PUBLIC_SOURCER_ENCRYPTION_KEY || '';

const encryptString = (str?: string) => {
  if (!str) return '';
  if (str?.toLowerCase() === 'n/a') return '';
  return CryptoJS.AES.encrypt(JSON.stringify(str), secretKey).toString();
};

const decryptString = (str?: string) => {
  if (!str) return '';
  if (str?.toLowerCase() === 'n/a') return '';
  const bytes = CryptoJS.AES.decrypt(str, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const formatEmail = (str?: string | { email: string }, enriched?: boolean) => {
  if (!str || str == '' || (typeof str !== 'string' && !str?.email)) return '';
  if (str?.toString().toLowerCase() === 'n/a') return '';
  if (typeof str !== 'string' && str?.email) return `<a href="mailto:${str.email}" data-enriched="${Boolean(enriched)}">${str.email}</a>`;
  return `<a href="mailto:${str}" data-enriched="${Boolean(enriched)}">${str}</a>`;
};

const formatLink = (str?: string) => {
  if (!str) return '';
  if (str?.toLowerCase() === 'n/a') return '';
  return `<a href="https://${str}">${str}</a>`;
};

const formatPhone = (str?: string, enriched?: boolean) => {
  if (!str) return '';
  if (str?.toLowerCase() === 'n/a') return '';
  const cleaned = ('' + str).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1,3}|)?(\d{3})(\d{3})(\d{4})$/);
  const phone = match ? `(${match[2]}) ${match[3]}-${match[4]}` : str; // format; no country code
  return `<a href="tel:${str}" data-enriched="${Boolean(enriched)}">${phone}</a>`;
};

// a safer way of dynamically looking up an object key
const getDynamicObject = <T,>(object: T, name: keyof T) => {
  const obj = Object.getOwnPropertyDescriptor(object, name);
  return obj?.value;
};

const getFooterMenuItems = ({ hidden, notes }: Partial<ICard>): { icon: string; title: string }[] => {
  const blank = { icon: '', title: '' };

  return [
    { icon: 'far fa-eye', title: hidden ? 'Unhide' : 'Hide' },
    !hidden ? { icon: 'far fa-edit', title: `${notes ? 'Edit' : 'Add'} Note` } : blank,
    // dont show a trash icon if there are no notes or if its hidden
    notes && !hidden ? { icon: 'far fa-trash', title: `Delete Note` } : blank,
    // filter out the empty object from the array if no notes or hidden
  ].filter(({ icon }) => Boolean(icon));
};

const mapEmails = (emails?: string[] | string, enriched?: boolean) => {
  if (!emails || emails.length === 0) return [''];
  if (typeof emails == 'string') {
    return [emails].flat().map(elm => formatEmail(elm, enriched));
  } else {
    return emails.flat().map(elm => formatEmail(elm, enriched));
  }
};

const mapPhones = (phones?: string[] | string, enriched?: boolean) => {
  if (!phones || phones.length === 0) return [''];
  if (typeof phones == 'string') {
    return [phones].flat().map(elm => formatPhone(elm, enriched));
  } else {
    return phones.map(elm => formatPhone(elm, enriched));
  }
};

// the thing -> the_thing
const snakeCase = (str: string) => str.split(' ').join('_');

// locked -> Locked
const titleCase = (str = '') => str?.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());

const isEncrypted = (str: string): boolean => {
  const bytes = CryptoJS.AES.decrypt(str, secretKey);
  try {
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return !!decrypted;
  } catch (error) {
    return false;
  }
};

/**
 * Checks if the resume is base64 format
 * @param resume - The resume, can be base64, html, or URL
 */
const isResumeBase64 = (resume: string) => {
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return base64regex.test(resume);
};

const buildContactInfoArray = (profile?: Partial<ICard>) => [
  {
    icon: 'fa-user',
    title: 'Name',
    info: [`${titleCase(profile?.name?.first_name) || ''} ${titleCase(profile?.name?.last_name) || ''}`.trim()],
  },
  {
    icon: 'fa-phone',
    title: 'Phone Number',
    info: [
      ...new Set([
        ...[profile?.source?.phone_numbers?.map((elm: string) => formatPhone(elm?.toString()))],
        ...mapPhones(profile?.enriched_phones, true),
        ...mapPhones(profile?.source?.phone_number),
        ...mapPhones(profile?.raw_response?.phone_number),
        ...mapPhones(profile?.source?.response?.profile?.phone),
      ]),
    ]
      .flat()
      .filter(Boolean),
  },
  {
    icon: 'fa-envelope',
    title: 'Email',
    info: [
      ...new Set([
        ...mapEmails(profile?.source?.response?.profile?.emails),
        ...mapEmails(profile?.source?.personal_emails),
        ...mapEmails(profile?.source?.emails?.map(({ address }: { address: string }) => address)),
        ...mapEmails(profile?.enriched_emails, true),
        ...mapEmails(profile?.source?.email),
        ...mapEmails(profile?.raw_response?.email),
      ]),
    ]
      .flat()
      .filter(Boolean),
  },
  {
    icon: 'fa-globe',
    title: 'Social',
    info: [profile?.source?.profiles?.map(({ url }) => formatLink(url))].flat().filter(Boolean),
  },
  {
    icon: 'fa-globe',
    title: 'Website',
    // TODO: Does website data exist in the card data?
    info: [''].filter(Boolean),
  },
];

export {
  buildContactInfoArray,
  decryptString,
  encryptString,
  formatEmail,
  formatLink,
  formatPhone,
  getDynamicObject,
  getFooterMenuItems,
  isEncrypted,
  isResumeBase64,
  mapEmails,
  snakeCase,
  titleCase,
};
