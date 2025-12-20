class ApiResponse {
    constructor(statusCode,data,message="Success") {
        this.statusCode=statusCode
        this.data=data
        this.Success=statusCode<400
        this.message=message
    }
}

export{ApiResponse}