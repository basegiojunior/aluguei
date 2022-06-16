export interface ToggleListProps {
  list: Array<{ value: string; icon: string }>;
  value: string;
  onChange: (value: string) => void;
  title: string;
}
