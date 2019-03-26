function add(x,y){
    return x+ y;
}

function substract(x,y){myFunc
    return x - y;
}

function multiply(x,y){
    return x * y;
}

var url = 'http://localhost'

var person = {
    name: "John",
    surname: "Doe",
    dob: "1987-10-21"
}

module.exports.add = add;
module.exports.substract = substract;
module.exports.multiply = multiply;
module.exports.endPoint = url;
module.exports.user = person;