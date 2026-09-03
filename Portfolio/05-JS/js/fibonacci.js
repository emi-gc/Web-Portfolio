/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers
var memo = {};
function fibonacci() {
  "use strict";

  var n = document.getElementById("num").value;
  var val = f(n);

  document.getElementById("fibonacciLbl").textContent = val; // Added it directly on the HTML website
  console.log(val); // for good measure also
}

function f(n) {
  n = Number(n);
  var value;
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    // Fibonacci recursive algorithm
    if (n < 2) {
      value = n;
    }
    else {
      value = f(n-1) + f(n-2);
    }

    memo[n] = value;
  }
    return value;

}