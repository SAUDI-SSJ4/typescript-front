import JoditEditor from "jodit-react";

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return <JoditEditor value={value} onChange={onChange} />;
}
