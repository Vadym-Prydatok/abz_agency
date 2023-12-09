import * as classNames from "classnames";
import * as React from "react";
import { ChangeEvent, RefObject, FocusEvent } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: (
    ref: RefObject<HTMLInputElement>
  ) => (e: FocusEvent<HTMLInputElement>) => void;
  onBlur: (
    ref: RefObject<HTMLInputElement>
  ) => (e: FocusEvent<HTMLInputElement>) => void;
  error: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div>
      <label
        htmlFor={id}
        className={classNames(
          "py-[14px] px-4 border rounded block hover:border-blue",
          {
            "border-error border-2": error,
          },
          {
            "border-gray border": !error,
          }
        )}
      >
        <span className="text-gray bg-light_gray placeholder">{label}</span>
        <input
          type={type}
          id={id}
          name={id}
          ref={inputRef}
          value={value}
          onFocus={onFocus(inputRef)}
          onBlur={onBlur(inputRef)}
          onChange={onChange}
        />
      </label>
      {id === "phone" ? (
        error ? (
          <p className="text-xs text-error">{error}</p>
        ) : (
          <p className="text-xs text-gray">+38 (XXX) XXX - XX - XX</p>
        )
      ) : (
        error && <p className="text-xs text-error">{error}</p>
      )}
    </div>
  );
};

export default InputField;
