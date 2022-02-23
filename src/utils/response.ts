interface ResponseFormated {
    data: Array<object>
}

const responseFormated = (data: Array<object>) => {
    const response: ResponseFormated = {
        data: data
    }
    
    return response
}

export default { responseFormated }