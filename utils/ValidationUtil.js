export const PATTERNS = {
  PASSWORD: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/,
  MPIN: /^(?!(.)\1{3})(?!19|20)\d{4}$/,
  MOBILE: /^[0-9]{10}$/,
  DTH: /^[0-9]{5,}$/,
  PERSON_NAME: /^[a-zA-Z]+[a-zA-z\s]$/,
  FIRST_LAST_NAME: /^[a-zA-Z]+ [a-zA-Z]+$/,
  TEXT_MIN_3: /^[a-zA-Z\s]{3,}$/,
  TEXT: /^[a-zA-Z0-9\s]{1,}$/,
  LENGTH_MIN_10: /^.{10,}$/,
  ALLPHABETS: /^[a-zA-Z\s]{1,}$/,
  BANK_NAME: /^[a-zA-Z\s-]{9,}$/,
  STATE_NAME: /^[a-zA-Z\s-]{3,}$/,
  OPERATOR: /^[a-zA-Z\s-]{3,}$/,
  IFSC: /^[A-Za-z]{4}[0-9a-zA-Z]{7}$/,
  AMT_10_25k:
    /^([1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{2,3}|[1]{1}[0-9]{1}[0-9]{0,3}|[2]{1}[0-4]{1}[0-9]{0,3}|25000)$/,
  AMT_10_10k: /^([1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{2,3}|10000)$/,
  AMT_02_25k:
    /^([2-9]{1}|[1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{2,3}|[1]{1}[0-9]{1}[0-9]{0,3}|[2]{1}[0-4]{1}[0-9]{0,3}|25000)$/,
  EMAIL: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  AADHAAR: /^[0-9]{12}$/,
  TEXT_MIN_16: /^[0-9]{16}$/,
  // UPI: /^([\w.-]*[@][\w]*)$/,
  UPI: /^[\w\.\-_]{3,}@[a-zA-Z]{3,}$/,
  ALPHA_NUMERICS: /^[A-Za-z0-9]+$/,
  CA_NUMBER: /^[A-Za-z0-9]{6,}$/,
};

export const isValid = (regEx, data) => {
  if (regEx && data) {
    return regEx.test(data);
  }
  return false;
};

export const isValidData = (dataArray) => {
  const validRes = { isValid: true, errors: [] };
  if (Array.isArray(dataArray)) {
    for (let i in dataArray) {
      const obj = dataArray[i];
      const flag = isValid(obj.regEx, obj.value);
      if (obj.isRequired && !flag) {
        // || (!obj.isRequired && obj.value)) {
        validRes.isValid = false;
        validRes.errors.push(obj.error);
      }
    }
  }
  return validRes;
};
