import React, { useState } from 'react';

function useSelect(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = event.target.value;
    setValue(newValue);
  }

  return {
    value,
    setValue,
    handleChange,
  };
}

export default useSelect;
