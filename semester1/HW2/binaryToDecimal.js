const binaryToDecimal = (binaryNum) => {
    let decimalNum = 0; 
    let binaryNumArr = binaryNum.split("");

    for (let i = binaryNumArr.length; i > 0; i--) { 
        decimalNum += (Math.pow(2, i) * Number(binaryNumArr[i - 1]));
    }

    return decimalNum;
}

console.log(binaryToDecimal("101010"));