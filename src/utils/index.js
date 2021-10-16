module.exports = {
    errorMessage: (innerError, message, file, functionName) => {
        return {
            innerError: innerError,
            message: message,
            file: file,
            function: functionName,
        };
    },
};
