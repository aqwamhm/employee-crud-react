const Input = ({
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  as = "input",
  children,
  ...rest
}) => {
  const InputTag = as;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <InputTag
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-gray-50 mt-1 p-2 block w-full rounded-md shadow-sm ${
          error ? "border border-red-500" : "focus:border-blue-500"
        } focus:ring ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        } focus:ring-opacity-50 outline-none sm:text-sm`}
        {...rest}
      >
        {children}
      </InputTag>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
