var expFecha = /(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}/;

console.log("Fecha:");
console.log(expFecha.test("Nací el 05/04/1982 en Donostia"));
console.log(expFecha.test("Nací el 55/04/1982 en Donostia"));
console.log(expFecha.test("Nací el 05/23/1982 en Donostia"));

var expEmail = /^(\w|\.|\-)+@(\w)+\.[a-zA-Z]{2,3}$/;

console.log("Email:");
console.log(expEmail.test("i.compains-82@gmail.com"));
console.log(expEmail.test("i.compains-82@gmail.co"));
console.log(expEmail.test("@gmail.com"));
console.log(expEmail.test("i.compains-82@g-mail.com"));

var re = /(\w+)\s(.+)/; //Los parentesis también crean grupos. Así (\w+) es el grupo $1 y (.+) es el grupo $2
console.log("John Smith".replace(re, "$2, $1"));
