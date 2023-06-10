// String

console.log("Hello coders How are you");
let firstName = "Ankit";
let lastName = "Yadav";
//console.log(firstName , lastName);

//String Concatination and using + operatore
 // 2 methode using template litrals
let fullName = `This methode by string concatination ${firstName} ${lastName}`;
console.log(fullName);

//geting string charectore by index
console.log(firstName [0]);


//string methodes

console.log(firstName.indexOf("i"));
console.log(firstName.toUpperCase());

let dummyString = '  Hello bro kaise ho   ';
console.log(dummyString);
let result = dummyString.trim();
console.log(result);

//last indexOf methode
console.log(result.lastIndexOf("Ho")); //case senstive be carefull

//include methode 
console.log(result.includes("bro"));  //see the string true / false and its case senstive so be carefull
