import React, { useRef, useEffect } from 'react';
import AsyncSelect from 'react-select/async';

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

export default function SelectStudent({
  name,
  label,
  options,
  inputChange,
  placeholder,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'select.state.value.id',

      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <AsyncSelect
        name={fieldName}
        cacheOptions
        defaultOptions
        loadOptions={options}
        ref={ref}
        onInputChange={inputChange}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        styles={customStyles}
        placeholder={placeholder}
      />

      {error && <span>{error}</span>}
    </>
  );
}
