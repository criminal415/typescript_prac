//변수 선언시 type은 
//string, num, boolean, null, undefined, bigint, [], {}등을 선언할 수 있다. 
let User = 'kim';
let Users_ary = ['kim', 'park'];
let User_ojt = { name: 'kim' }; //?는 name이라는 속성이 들어올수도 안들어올수도 있다 즉, name 속성은 옵션!
let Name_num = 123;
let Name = 123;
//num type의 변수를 받아 num type의 변수 return
function myfunc(x) {
    return x * 2;
}
let john = [123, true];
let denny = { name: 'Oh' };
let tom = { name: 'Oh', age: '28' };
//class type 지정
class User2 {
    constructor(name) {
        this.name = name;
    }
}
//Union type 예제
let Users2 = [1, '2', 3];
let Ojt = { a: '123' };
//모든 type 지정
let Name3 = 123;
Name3 = '호';
Name3 = []; //but any로 사용하면 typescript 쓰는 의미가 없어짐
let Name4 = 456;
Name4 = '호';
Name4 = {}; //any 와 비슷하나 unknown이 좀더 안전 아래와 같은 상황
let a = Name3; //error 안남 any
let b = Name4; //error 남   unknown
//같은 type 끼리의 연산만 error가 나지 않는다.
let Num2 = 1;
Num2 + 1; // error!!!
let Age2;
Age2 + 1; // error!! string type (Age21 허용), number type (허용) but string|number (error)
