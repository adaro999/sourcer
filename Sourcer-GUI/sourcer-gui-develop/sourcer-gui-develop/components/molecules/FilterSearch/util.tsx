import { IFilterCategory, IOptionReducerAction, ISelectedOption } from './types';

/*
this takes a deeply nested object, breaks it apart, filters out false values and then
puts all back together the way it was

obj = { 
    'job title': {
        'the name of the job': true/false,
        'another job name': true/false
    },
    'company': {
        'company name': true/false,
        'second company: true/false
    }
}
*/
const getFilteredOptions = (obj: ISelectedOption) =>
  Object.keys(obj)
    // [ 'job title', 'company' ]
    .map(elm =>
      Object.entries(obj[elm as IFilterCategory] || {})
        // [ 'company name', true/false ]
        .filter(elm => Boolean(elm[1]))
        .reduce(
          (acc: Record<string, ISelectedOption>, curr) => ({
            [elm]: {
              ...acc[elm as string],
              [curr[0]]: curr[1],
            },
          }),
          {},
        ),
    )
    .reduce(
      (acc, curr) => ({
        ...acc,
        ...curr,
      }),
      {},
    );

const optionReducer = (state: ISelectedOption, action: IOptionReducerAction) => ({
  ...state,
  [action.type]: {
    ...state[action.type],
    ...action.update[action.type],
  },
});

export { getFilteredOptions, optionReducer };
