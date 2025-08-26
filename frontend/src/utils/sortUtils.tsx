const sortObjectsByProp = (property: any) => {
  return (a: any, b: any) => {
      const valueA = a[property];
      const valueB = b[property];
      for (let i = 0; i < Math.min(valueA.length, valueB.length); i++) {
          if (valueA.charCodeAt(i) !== valueB.charCodeAt(i)) {
              return valueA.charCodeAt(i) - valueB.charCodeAt(i);
          }
      }
      return valueA.length - valueB.length;
  };
};

export {
  sortObjectsByProp
};