class ApiError extends Error{
    constructor(
        statusCode,
        message ="Something went wrong",
        errors=[],
        stack="",
    ){
        super(message),
        this.statusCode = statusCode,
        this.data= null,
        this.messag= message,
        this.success= false,
        this.errors = errors 

        if (stack){
            this.stack= stack  // yaha pe sir ne  statck likha tha yaha error ho sakti h
        } else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}