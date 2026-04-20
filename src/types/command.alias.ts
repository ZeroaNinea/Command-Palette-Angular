export type Command = {
  id: string;
  label: string;
  keywords?: string[];
  shortcut?: string;
  payload?: any;
  handler?: (payload: any) => void;
};
