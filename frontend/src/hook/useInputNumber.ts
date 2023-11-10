import React, { useState } from 'react';

function useInputNumber(initialValue: number) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(event.target.value);

    if (!Number.isNaN(newValue)) {
      setValue(newValue);
    }
  }

  return {
    value,
    setValue,
    handleChange,
  };
}

export default useInputNumber;
