// Variables
const MOD_START_VAL = 0;
const MOD_MUST_EQUAL_TO_ONE = 1;

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
  .split('') // ['0','0','0','0','1','0','0','1','0','0','0','0','0','3','5','0','9','3','0','0','0','1','T','R','4','7']
  .map((item) => parseInt(item, 36)) // [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 3, 5, 0, 9, 3, 0, 0, 0, 1, 29, 27, 4, 7]
  .join('') // 0000100100000350930001292747

const getMod9710 = (value) => {
  const valueToArray = value.split('');
  // [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 3, 5, 0, 9, 3, 0, 0, 0, 1, 2, 9, 2, 7, 4, 7]
  
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

module.exports = validateIban;
