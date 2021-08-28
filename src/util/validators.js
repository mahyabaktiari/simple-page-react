export function moneySplitter(input) {
  if (input === 0 || input === null) {
    return 0;
  } else {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
