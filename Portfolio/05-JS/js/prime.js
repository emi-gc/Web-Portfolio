/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
  "use strict";

  function isPrime(n) {
    var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  var i,
    sequence = [];
  for (i = 2; i <= n; i++){ // checks from 2 to number
    if (n % i === 0 && isPrime(i)) { // if i is a prime factor
      sequence.push(i); // add to sequence array

    }
  }  
  return sequence;
};
function displayPrimeFactors() {
  "use strict";

  var n = Number(document.getElementById("num").value); // Convert input in num to Number to variable n
  var factors = getPrimeFactors(n); // Gets prime factors

  document.getElementById("pf").textContent = factors.join(", "); // Displays factors separated by a comma on ID pf
}