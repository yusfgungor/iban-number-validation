// Variables

const numericRegex = /^[0-9]*$/;
const MOD_START_VAL = 0;
const MOD_MUST_EQUAL_TO_ONE = 1;
const charactersConversionArray = {
  A: '10',
  B: '11',
  C: '12',
  D: '13',
  E: '14',
  F: '15',
  G: '16',
  H: '17',
  I: '18',
  J: '19',
  K: '20',
  L: '21',
  M: '22',
  N: '23',
  O: '24',
  P: '25',
  Q: '26',
  R: '27',
  S: '28',
  T: '29',
  U: '30',
  V: '31',
  W: '32',
  X: '33',
  Y: '34',
  Z: '35'
}

// Functions

const setCharactersLocations = ibanValue => {
  // The first four characters of the IBAN are truncated and thrown to the right of the number.
  // ibanValue = TR47 0000 1001 0000 0350 9300 01
  const removedSpaceIbanValue = ibanValue.replace(/\s/g, ''); // TR470000100100000350930001
  const firstFourChar = removedSpaceIbanValue.substr(0,4); // TR47
  const remainingChars = removedSpaceIbanValue.substr(4); // 0000100100000350930001

  return remainingChars.concat(firstFourChar); // 0000100100000350930001TR47
}

const charactersMatchAndChange = value => value
  .split('')
  .map((item) => numericRegex.test(item) ? item : charactersConversionArray[item])
  .join('');

const getMod9710 = (value) => {
  const valueToArray = value.split('');

  return valueToArray.reduce((accumulator, currentValue) =>
    (((accumulator * 10) + Number(currentValue)) % 97 ), MOD_START_VAL);
}

const validateIban = (ibanValue) => {
  if (ibanValue && typeof ibanValue === 'string') {
    // ibanValue = TR47 0000 1001 0000 0350 9300 01
    const ibanCharactersLocationsChanged = setCharactersLocations(ibanValue); // 0000100100000350930001TR47
    const ibanCharactersMatchAndChanged = charactersMatchAndChange(ibanCharactersLocationsChanged); // 0000100100000350930001292747
    const result = getMod9710(ibanCharactersMatchAndChanged) === MOD_MUST_EQUAL_TO_ONE ? true : false; // getMod9710(ibanCharactersMatchAndChanged) = 1

    return !!result;
  }

  console.error("iban value must be a string");
}

export default validateIban;
