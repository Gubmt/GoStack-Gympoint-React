import React, { useRef, useEffect } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt', pt);

export default function DatePicker({
  name,
  selected,
  inputChange,
  customInput,
  placeholder,
}) {
  const ref = useRef(null);
  const { fieldName, registerField } = useField(name);

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
        name={fieldName}
        selected={selected}
        onChange={inputChange}
        customInput={customInput}
        locale="pt"
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        ref={ref}
      />
    </>
  );
}
