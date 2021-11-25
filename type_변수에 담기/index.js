let 동물 = 123;
let teacher = { name: "john", age: 20 };
//readonly object 속성 값 변경 불가
const 출생지역 = "seoul";
출생지역 = "busan";
//-------------------------------
const 여친 = { name: "엠버" };
여친.name = "유라";
//---------------------------------
let 여자친구 = { name: "엠버" };
여자친구.name = "유라"; //readonly라서 에러남 but, typescript에서만 에러 변경된 javascript에서는 에러가 안남
let 좌표 = { x: 1, y: 2 };
let 테스트용변수 = {
    size: 123,
    position: [1, 2, 3],
};
let 회원가입정보 = {
    name: "kim",
    phone: 123,
};
let New회원가입정보 = {
    name: "kim",
    adult: false,
    phone: 1234,
};
//Literal Types
let num3; //num3변수에는 숫자타입의 123만 입력가능하다!! 다른 타입 다른 숫자 입력불가!
let 방향; //방향이라는 변수에 값을 넣을때, "left", "right"의 두 값만 넣을 수 있으며 자동완성기능 제공
방향 = "left";
function 함수(a) {
    return 1;
}
function rock(a) {
    return ["가위", "보"];
}
//Literal type의 문제점!
let 자료 = {
    name: "kim",
};
function 내함수(a) { }
내함수(자료.name); // 내함수의 a 파라미터는 'kim'이라는 타입만 받아올 수 있다. 자료.name은 string type 이므로 error가 난다.
//해결책!!
// 1. object 만들 때 타입을 잘 미리 정하든가
// 2. 예전에 배웠던 assertion을 쓰시든가 (as 'kim' 이런걸 붙이는 겁니다)
// 3. 아니면 as const 라는걸 애초에 object 자료에 붙일 수 있습니다.
let 자료_sol = {
    name: "kim",
};
function 내함수_sol(a) { }
내함수(자료_sol.name);
//as const 기능!!!
// 1. 타입을 object의 value로 바꿔줍니다. (타입을 'kim'으로 바꿔줍니다)
// 2. object안에 있는 모든 속성을 readonly로 바꿔줍니다 (변경하면 에러나게)
