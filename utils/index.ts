export const toCapitalCase = (str: string): string => {
  const words = str.split(/\s/);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  return capitalizedWords.join(' ');
};

export const formatCurrency = (number: number): string => {
  return number.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

