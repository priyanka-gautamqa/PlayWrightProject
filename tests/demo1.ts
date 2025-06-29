let message1 : string = "Hello";
//message1 =2; --> error

console.log("message1 : ",message1)

message1 = "bye";

let age1 : number =20;
console.log("age1 : ",age1)

let isActive : boolean = false;

let digits : number[] = [1,2,3];

let data : any = "this could be anything";
data = 42; 


function add(a:number,b:number) : number{
    return a+b;
}

add(3,4);

//OBJECT
let user:{name:string,age:number} = {name:"BOB", age:23};
//user.location = "India"; //error