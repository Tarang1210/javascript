function oddSum(n)
{
    let total = 0, result=[]; 
    for(let x = 1; x <= n; x++) 
    { 
       let odd = 2*x-1; 
       total += odd;
       result.push(total);
    }
    return result;
}

var result = oddSum(5);
console.log(result);