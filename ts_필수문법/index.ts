//변수 선언이 많아지면 type을 선언하여 사용할 수 있다.
type myType = string | number | boolean; //Union type 두개 이상의 타입을 합친 새로운 타입

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

//Union type 예제
let Users2 :(number | string)[] = [1, '2', 3]
let Ojt : { a : string | number} = { a : '123'}

//모든 type 지정
let Name3 :any = 123
Name3 = '호';
Name3 = []; //but any로 사용하면 typescript 쓰는 의미가 없어짐
let Name4 :unknown = 456;
Name4 = '호';
Name4 = {}; //any 와 비슷하나 unknown이 좀더 안전 아래와 같은 상황
let a :string = Name3 //error 안남 any
let b :string = Name4 //error 남   unknown

//같은 type 끼리의 연산만 error가 나지 않는다.
let Num2 :unknown = 1
Num2+1 // error!!!
let Age2 :string|number;
Age2 +1; // error!! string type (Age21 허용), number type (허용) but string|number (error)