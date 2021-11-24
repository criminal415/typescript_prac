//function type 도 지정가능
//arrow function
type NumOut = (x: number, y: number) => number;
// (파라미터)=>{}  //arrow function 문법
// function(파라미터){} //일반 function 문법
//차이는 this 값이 달라진다!
//일반 function
type NumOut2 = (x: number, y: number) => number;
let ABC: NumOut = function (x, y) {
  return x + y;
};

//object 안에 함수 넣기!
let 회원정보 = {
  name: "kim",
  age: 30,
  plusOne(x) {
    return x + 1;
  },
  changeName: () => {
    console.log("안녕");
  },
};
회원정보.plusOne(1);
회원정보.changeName();

//예시1
type 회원정보2 = {
  name: string;
  age: number;
  plusOne: (x: number) => number;
  changeName: () => void;
};

//예시2
type CutType = (x: string) => string;

let cutZero: CutType = function (x) {
  let result = x.replace(/^0+/, "");
  return result;
};
function removeDash(x: string): number {
  let result = x.replace(/-/g, "");
  return parseFloat(result);
}

//콜백함수 예시
//javacript
function 만들함수2(a, func1, func2) {
  let result = func1(a);
  let result2 = func2(result);
  console.log(result2);
}
만들함수2("010-1111-2222", cutZero, removeDash); //1011112222 출력잘됨

//typescript
type 함수타입1 = (a: string) => string;
type 함수타입2 = (a: string) => number;

function 만들함수3(a: string, func1: 함수타입1, func2: 함수타입2) {
  let result = func1(a);
  let result2 = func2(result);
  console.log(result2);
}
만들함수3("010-1111-2222", cutZero, removeDash); //1011112222 출력잘됨

//interface object
interface Square {
  color: string;
  width: number;
}

let 네모: Square = { color: "red", width: 100 };

interface Student {
  name: string;
}
interface Teacher extends Student {
  age: number;
}
// interface Student {
//   name: string;
// }
// interface Teacher {
//   name: string;
//   age: number;
// }

//다음과 같이 두개를 합칠 수도 있다
interface Student {
  name: string;
}
interface Teacher {
  age: number;
}

let 변수: Student & Teacher = { name: "kim", age: 90 };
//-------------------------------------------------------------------------------
interface Animal1 {
  name: string;
}
interface Animal1 {
  legs: number;
}
//interface의 경우 중복선언시 extend 한것과 동일하게 동작한다
//장점(자주 쓰는 외부 라이브러리 이용시 type 선언을 덮어쓰기, override 하기 편리)
//반면 type의 경우 아래와 같이 중복선언을 하면 error가 난다(엄격함!)
type Animal2 = {
  name: string;
};
type Animal2 = {
  legs: number;
};
//하지만 둘다 object의 속성이 중복되면서 type이 다르면 error난다!!!(같은 타입이면 error안나고 하나로 합쳐줌)

//예제1
interface Product {
  brand: string;
  serialNumber: number;
  model: string[];
}

let 상품: Product = {
  brand: "Samsung",
  serialNumber: 1360,
  model: ["TV", "phone"],
};

//예제2
interface Cart {
  product: string;
  price: number;
}

let 장바구니: Cart[] = [
  { product: "청소기", price: 7000 },
  { product: "삼다수", price: 800 },
];

interface NewCart extends Cart{
    card : boolean
  }

let product :NewCart = { product : '청소기', price : 7000, card : false }
