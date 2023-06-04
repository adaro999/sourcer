interface IGoogleAutocomplete {
  defaultOptions?: { label?: string; value?: string }[];
  handleChange: (event: { label?: string } | null) => void;
  handleDelete: (str: string) => void;
  placeholder?: string;
  value?: { label?: string; value?: string };
}

export type { IGoogleAutocomplete };
