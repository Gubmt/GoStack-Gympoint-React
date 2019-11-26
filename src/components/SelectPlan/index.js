import React, { useRef, useEffect } from 'react';
import Select from 'react-select';

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
  }),
};

export default function ReactSelect({
  name,
  label,
  options,
  inputChange,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;

    return selectValue ? selectValue.id : '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;
    return options.find(option => option.id === defaultValue);
  }

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        aria-label={fieldName}
        options={options}
        defaultValue={getDefaultValue()}
        onChange={inputChange}
        ref={ref}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        styles={customStyles}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}
