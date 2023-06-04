import { ILocation, IProfileQuery } from '../../../hooks/useProfileCardController/types';

interface ISearchForm {
  formData?: { what?: string; location?: ILocation };
  setFormData: (obj: Partial<IProfileQuery>) => void;
}

export type { ISearchForm };
