//function for rounding a number to a given specific decimal places
export default function round(n, d = 2) {
  var x = n * Math.pow(10, d);
  var r = Math.round(x);
  var br = Math.abs(x) % 1 === 0.5 ? (r % 2 === 0 ? r : r - 1) : r;
  return br / Math.pow(10, d);
}
