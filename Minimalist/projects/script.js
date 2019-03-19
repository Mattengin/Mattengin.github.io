// $('li').hover(
//     function(){ $(this).addClass('jello') },
//     function(){ $(this).removeClass('jello') }
// )

// Complete the variadricAverage function so that it can take any number 
// of arguments and calculate their average.
//
// Bonus Test: Edit the 'average' function to use the 'variadricAverage'.

function average(numbers) {
    return variadricAverage.apply(null, numbers);
  };
  console.log('The average is: ' + average([2, 5, 6, 2, 45, 3, 23, 14]));
  
  function variadricAverage() {
    // YOUR CODE HERE
    for (var i = 0 , sum = 0 , n = arguments.length; i < n; i++) {
      sum += arguments[i];
    } 
    return sum / n;
  };
  console.log('The average is: ' + variadricAverage(2, 5, 6, 2, 45, 3, 23, 14));