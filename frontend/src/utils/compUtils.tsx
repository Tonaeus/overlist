const areArraysEqual = (arr1: Array<any>, arr2: Array<any>): boolean => {
  if (arr1.length !== arr2.length) {
    return false; 
  }

  for (let i = 0; i < arr1.length; i++) {
      if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
          return false;
      }
  }
  return true; 
};

export {
  areArraysEqual
}