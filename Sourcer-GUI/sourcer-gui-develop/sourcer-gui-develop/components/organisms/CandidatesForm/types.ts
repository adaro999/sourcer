import { FormEvent } from 'react';
import { IProfileQuery } from '../../../hooks/useProfileCardController/types';

interface ICandidatesForm {
  formData?: { what?: string };
  setFormData: (obj: Partial<IProfileQuery>) => void;
  handleSubmit?: (e: FormEvent) => void;
}

export type { ICandidatesForm };
