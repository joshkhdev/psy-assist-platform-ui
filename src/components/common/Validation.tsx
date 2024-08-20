import { z as zodSchema } from 'zod';
import {MIN_AGE, MAX_AGE} from '../../resources/ValidationResources';

export const validateEmail = (email: string | null): boolean => {
    const result = zodSchema.string().email().safeParse(email);
    return result.success;
};

export const validateInput = (
    isChecked: boolean,
    value: string | null,
    setValueIsEmpty: React.Dispatch<React.SetStateAction<boolean>>,
    setValueVerify: React.Dispatch<React.SetStateAction<boolean>> | null = null,
    validation: ((value: string | null) => boolean) | null = null
): boolean => {
    
    if (!value) {
        setValueIsEmpty(true);
        
        if (setValueVerify) 
            setValueVerify(true);
  
        return false;
    }
    
    setValueIsEmpty(false);

    if (!setValueVerify || !validation)
        return isChecked;

    let isValid = validation(value);

    setValueVerify(isValid);

    return isValid ? isChecked : false;
};

export const handleBlurInput = (
        value: string,
        setValue: React.Dispatch<React.SetStateAction<string>>,
        setValueIsEmpty: React.Dispatch<React.SetStateAction<boolean>>, 
        setValueVerify: React.Dispatch<React.SetStateAction<boolean>> | null = null,
        validation: ((value: string | null) => boolean) | null = null
    ): boolean => {
    if (!value) {
      setValueIsEmpty(false);
      
      if (setValueVerify)
        setValueVerify(true);

      return false;
    }
  
    setValueIsEmpty(false);
    setValue(value);

    if (!validation || !setValueVerify)
        return true;

    let isValid = validation(value);

    setValueVerify(isValid);

    return isValid;
};

export const handleFocusInput = (
        setValue: React.Dispatch<React.SetStateAction<string>>,
        setValueIsEmpty: React.Dispatch<React.SetStateAction<boolean>>,
        setVerify: React.Dispatch<React.SetStateAction<boolean>> | null = null
    ) => {
    setValue('');
    setValueIsEmpty(false);

    if (setVerify) 
        setVerify(true);
};

export const validateAge = (age: string | null): boolean => {
    return age 
        ? zodSchema.number().min(MIN_AGE).max(MAX_AGE).safeParse(Number(age)).success 
        : false;
};