import { ChangeEvent } from 'react';
import { Button, Textarea } from '@jobtarget/ui-library';
import { IProfileNoteEdit } from './types';

const ProfileNoteEdit = ({ defaultValue, handleAdd, handleCancel, handleChange, name }: IProfileNoteEdit) => (
  <div className="d-flex flex-column align-items-end">
    <Textarea
      onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => handleChange(target.value)}
      onPasteChange={str => handleChange(str)}
      placeholder={`Add note about ${name} for future reference`}
      {...{ defaultValue }}
    />
    <div className="pt-2">
      <Button size="sm" variant="link" onClick={() => handleCancel()}>
        Dismiss
      </Button>
      <Button className="ml-3" size="sm" onClick={() => handleAdd()}>
        Add Note
      </Button>
    </div>
  </div>
);

export { ProfileNoteEdit };
