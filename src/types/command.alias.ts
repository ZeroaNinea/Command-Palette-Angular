export type Command = {
  id: string;
  label: string;
  keywords?: string[];
  shortcut?: string;
  payload?: unknown;
  handler?: (payload?: unknown) => void;
};
