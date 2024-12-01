/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { encode, decode } from './safeBase64';
import { stringify, parse } from './safeJSON';

const keysToEncrypt = ['coins', 'coins-spent', 'playerstats'];

const localstorage = (key: string, defaultValue: any) => {
  const encryptOn = keysToEncrypt.includes(key);

  const getLSValue = () => {
    const lsValue = String(window.localStorage.getItem(key));
    const value = parse(encryptOn ? decode(lsValue) : lsValue) ?? defaultValue;
    return value;
  };

  const setLSValue = (newValue: any) => {
    const encoded = encryptOn
      ? encode(stringify(newValue))
      : stringify(newValue);
    window.localStorage.setItem(key, encoded);
  };

  return { getLSValue, setLSValue };
};

export default localstorage;

export const useLocalStorage = (key: string, defaultValue: any) => {
  const { getLSValue, setLSValue } = localstorage(key, defaultValue);
  const [value, setValue] = useState(defaultValue);

  // on mount get the value from LS
  useEffect(() => {
    setValue(getLSValue());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setBoth = (newValue: any) => {
    setValue(newValue);
    setLSValue(newValue);
  };

  return [value, setBoth];
};
