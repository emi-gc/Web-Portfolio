/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

var sieve = function (n) {
  "use strict";

  var array = [], // not prime
    primes = [], // primes
    i, // checks each prime
    j; // crosses out multiples

  array = new Array(n).fill(false); // new bool array with n size, everything is false, false meaning number hasnt been marked as non prime

  for (i = 2; i < n; i++) { // checks every number from 2 < n
    if (array[i] === false) { // if current number isn't marked
      primes.push(i); // it is prime

      if (i * i < n) { // only happens if i squared is below limit
        for (j = i * i; j < n; j += i) { // starts an i squared and moves through every multiple of i
          array[j] = true; // marks as non prime
        }
      }
    }
  }
  return primes; // returns array of prime numbers
   
};

function displayPrimes() {
  "use strict";

  var n = Number(document.getElementById("num").value); // Finds input with id num, converts string to number.
  document.getElementById("primes").textContent = sieve(n).join(", "); // Calls function sieve with n as input, joins primes with commas and displays inside element with id primes
}
