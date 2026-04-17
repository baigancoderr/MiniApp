'use client';
import React, { useState, useRef, useEffect } from 'react';

const CustomDateInput = ({ label, value, onChange }) => {
  const [displayValue, setDisplayValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      const [yyyy, mm, dd] = value.split('-');
      setDisplayValue(dd && mm && yyyy ? `${dd}/${mm}/${yyyy}` : '');
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const handleInput = (e) => {
    let input = e.target.value.replace(/\D/g, '').slice(0, 8);
    let formatted = '';
    if (input.length > 0) formatted = input.slice(0, 2);
    if (input.length > 2) formatted += '/' + input.slice(2, 4);
    if (input.length > 4) formatted += '/' + input.slice(4, 8);

    setDisplayValue(formatted);

    if (input.length === 8) {
      const isoDate = `${input.slice(4,8)}-${input.slice(2,4)}-${input.slice(0,2)}`;
      onChange(isoDate);
    } else {
      onChange('');
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-[10px] text-gray-400 mb-1">{label}</label>
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={handleInput}
        placeholder="DD/MM/YYYY"
        maxLength={10}
        className="bg-[#0B0F1A] border border-[#444385] text-xs px-3 py-2 rounded-md
                   text-gray-300 focus:outline-none focus:border-blue-200
                   transition-all duration-200 [color-scheme:dark]"
      />
    </div>
  );
};

export default CustomDateInput;