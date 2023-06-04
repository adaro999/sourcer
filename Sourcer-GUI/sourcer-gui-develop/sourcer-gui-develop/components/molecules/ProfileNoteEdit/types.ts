interface IProfileNoteEdit {
  defaultValue?: string;
  handleAdd: () => void;
  handleCancel: () => void;
  handleChange: (str: string) => void;
  name: string;
}

export type { IProfileNoteEdit };
