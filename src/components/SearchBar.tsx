// src/components/SearchBar.tsx
type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      className="border rounded p-2 w-full"
      placeholder="Buscar por título…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
