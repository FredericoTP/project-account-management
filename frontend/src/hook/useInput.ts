import React, { useState } from 'react';

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return {
    value,
    setValue,
    handleChange,
  };
}

export default useInput;
