//변수 선언이 많아지면 type을 선언하여 사용할 수 있다.
type myType = string | number;

//변수 선언시 type은 
//string, num, boolean, null, undefined, bigint, [], {}등을 선언할 수 있다. 
let User :string = 'kim';
let Users_ary :string[] = ['kim', 'park'];
let User_ojt :{ name? : string } = { name : 'kim' }; //?는 name이라는 속성이 들어올수도 안들어올수도 있다 즉, name 속성은 옵션!

let Name_num :string[] | number = 123;
let Name :myType = 123;

//num type의 변수를 받아 num type의 변수 return
function myfunc(x :number) :number {
    return x * 2
}

//array type Member(tuple type) 의 첫번째는 number, 둘째는 boolean값만 입력할 수 있다.
type Member = [number, boolean];
let john :Member = [123, true];

//object type
type Member2 = {
    name : string,
}
let denny :Member2 = { name: 'Oh' }
//이때 object type에 지정해야할 속성이 너무 많다면...
type Member3 = {
    [key :string] : string, //글자로 된 모든 object 속성type은 :string
}
let tom :Member3 = { name: 'Oh', age: '28' }

//class type 지정
class User2 {
    name :string;
    constructor(name :string){
        this.name = name;
    }
}