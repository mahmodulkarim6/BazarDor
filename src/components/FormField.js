import { inputCls } from "@/lib/ui";

export default function FormField({ label, id, ...props }) {
  return (
    <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-medium">
    {label}</label>
  <input id={id} name={id} className={inputCls} {...props} />
</div>
  );
}