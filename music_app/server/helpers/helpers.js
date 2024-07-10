



function getThisFunctionName() {
    const err = new Error();
    const stack = err.stack.split('\n');
    const callerStackLine = stack[2];
    const functionName = callerStackLine.match(/at (\w+)/)[1];
    return functionName;
}





module.exports = { getThisFunctionName }




