import { formatEmail, formatLink, formatPhone, getDynamicObject, getFooterMenuItems, isResumeBase64, mapEmails, snakeCase, titleCase } from './index';

describe('formatEmail', () => {
  it('formats a string into an email link', () => {
    const assert1 = formatEmail();
    const assert2 = formatEmail('N/a');
    const assert3 = formatEmail('test@email.com');
    const assert4 = formatEmail('test2@email.com');
    const assert5 = formatEmail({ email: 'test2@email.com' });
    const assert6 = formatEmail({ email: '' });

    expect(assert1).toBe('');
    expect(assert2).toBe('');
    expect(assert3).toBe('<a href="mailto:test@email.com" data-enriched="false">test@email.com</a>');
    expect(assert4).toBe('<a href="mailto:test2@email.com" data-enriched="false">test2@email.com</a>');
    expect(assert5).toBe('<a href="mailto:test2@email.com" data-enriched="false">test2@email.com</a>');
    expect(assert6).toBe('');
  });
});

describe('formatLink', () => {
  it('formats a string into a link', () => {
    const assert1 = formatLink();
    const assert2 = formatLink('N/a');
    const assert3 = formatLink('google.com');
    const assert4 = formatLink('test.com');

    expect(assert1).toBe('');
    expect(assert2).toBe('');
    expect(assert3).toBe('<a href="https://google.com">google.com</a>');
    expect(assert4).toBe('<a href="https://test.com">test.com</a>');
  });
});

describe('formatPhone', () => {
  it('formats a string into a telephone link', () => {
    const assert1 = formatPhone();
    const assert2 = formatPhone('N/a');
    const assert3 = formatPhone('123-456-7890');
    const assert4 = formatPhone('888-123-4567');

    expect(assert1).toBe('');
    expect(assert2).toBe('');
    expect(assert3).toBe('<a href="tel:123-456-7890" data-enriched="false">(123) 456-7890</a>');
    expect(assert4).toBe('<a href="tel:888-123-4567" data-enriched="false">(888) 123-4567</a>');
  });
});

describe('getDynamicObject', () => {
  it('returns the same value as a bracket notation lookup', () => {
    const testObj = {
      name: 'billy',
      age: 25,
    };

    const assert1a = getDynamicObject(testObj, 'name');
    const assert1b = testObj['name'];

    const assert2a = getDynamicObject(testObj, 'age');
    const assert2b = testObj['age'];

    expect(assert1a).toBe('billy');
    expect(assert1a).toEqual(assert1b);

    expect(assert2a).toBe(25);
    expect(assert2a).toEqual(assert2b);
  });
});

describe('getFooterMenuItems', () => {
  it('does something', () => {
    const assert1 = getFooterMenuItems({ hidden: true, name: { first_name: 'harry' } });
    const assert2 = getFooterMenuItems({ hidden: false, name: { first_name: 'sally' } });

    expect(assert1[0].title).toBe('Unhide');
    expect(assert2[0].title).toBe('Hide');
  });
});

describe('isResumeBase64', () => {
  it('returns a boolean if the string is base64 or not', () => {
    const isHTML = '<div>hello world</div>';
    const isURL = 'https://jobtarget.com';
    const isBase64 = 'U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=';

    const assert1 = isResumeBase64(isHTML);
    const assert2 = isResumeBase64(isURL);
    const assert3 = isResumeBase64(isBase64);

    expect(assert1).toBe(false);
    expect(assert2).toBe(false);
    expect(assert3).toBe(true);
  });
});

describe('mapEmails', () => {
  it('returns an array of empty strings or formatted emails', () => {
    const assert1 = mapEmails();
    const assert2 = mapEmails([]);
    const assert3 = mapEmails(['test1@email.com', 'test2@email.com']);
    const assert4 = mapEmails(['test1@email.com', 'N/A']);

    expect(assert1).toStrictEqual(['']);
    expect(assert2).toStrictEqual(['']);
    expect(assert3).toStrictEqual([
      '<a href="mailto:test1@email.com" data-enriched="false">test1@email.com</a>',
      '<a href="mailto:test2@email.com" data-enriched="false">test2@email.com</a>',
    ]);
    expect(assert4).toStrictEqual(['<a href="mailto:test1@email.com" data-enriched="false">test1@email.com</a>', '']);
  });
});

describe('snakeCase', () => {
  it('should return the correct snake_casing of a string', () => {
    const assert1 = snakeCase('first word second word');
    const assert2 = snakeCase('this is a test');
    const assert3 = snakeCase('you are just 1 person');

    expect(assert1).toBe('first_word_second_word');
    expect(assert2).toBe('this_is_a_test');
    expect(assert3).toBe('you_are_just_1_person');
  });
});

describe('titleCase', () => {
  it('should return the correct Title Casing of a string', () => {
    const assert1 = titleCase('first word second word');
    const assert2 = titleCase('this is a test');
    const assert3 = titleCase('a');
    const assert4 = titleCase('you are just 1 person');

    expect(assert1).toBe('First Word Second Word');
    expect(assert2).toBe('This Is A Test');
    expect(assert3).toBe('A');
    expect(assert4).toBe('You Are Just 1 Person');
  });
});
