interface Input {
  label: string;
  placeholder: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({ label, placeholder, type, onChange }: Input) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
