import { z as zodSchema } from 'zod';

export const validateEmail = (email: string | null): boolean => {
    try {
      zodSchema.string().email().parse(email);
      return true;
    } catch {
      return false;
    }
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