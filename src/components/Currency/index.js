import React, { useRef, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';

import { useField } from '@rocketseat/unform';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
  }),
  control: () => ({
    border: '1px solid #ddd',
    borderRadius: '4px',
    display: 'flex',
    height: '45px',
    marginTop: '8px',
  }),
};

export default function Currency({
  name,
  inputvalue,
  label,
  thousandSeparator,
  prefix,
  suffix,
  onValueChange,
  placeholder,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.inputvalue',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <CurrencyFormat
        name={fieldName}
        thousandSeparator={thousandSeparator}
        prefix={prefix}
        suffix={suffix}
        onValueChange={onValueChange}
        inputvalue={inputvalue}
        placeholder={placeholder}
        isNumericString
        styles={customStyles}
        ref={ref}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}
