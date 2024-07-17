import { Label, TextInput } from "flowbite-react";

const SemInput = ({
  id,
  icon,
  type,
  label,
  placeholder,
  addOn,
  event,
  name,
  color,
  value,
}) => {
  return (
    <div className="my-2">
      <div className="mb-2 block">
        <Label color={color ? color : "info"} htmlFor={id} value={label} />
      </div>
      <TextInput
        name={name}
        onChange={event}
        addon={addOn}
        id={id}
        icon={icon}
        type={type}
        placeholder={placeholder}
        required
        color={color}
        value={value}
      />
    </div>
  );
};

export default SemInput;
