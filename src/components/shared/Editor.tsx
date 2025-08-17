export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-32 p-2 border rounded-md"
      placeholder="أدخل النص هنا..."
    />
  );
}
