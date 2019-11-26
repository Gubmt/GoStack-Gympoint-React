import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt', pt);

export default function DatePicker({ name, selected, inputChange, customInput, placeholder}) { // eslint-disable-line
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        ref={ref}
        name={fieldName}
        selected={selected}
        onChange={inputChange}
        customInput={customInput}
        locale="pt"
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
      />
      {error && <span>{error}</span>}
    </>
  );
}
