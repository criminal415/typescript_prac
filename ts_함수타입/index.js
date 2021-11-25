let ABC = function (x, y) {
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
let cutZero = function (x) {
    let result = x.replace(/^0+/, "");
    return result;
};
function removeDash(x) {
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
function 만들함수3(a, func1, func2) {
    let result = func1(a);
    let result2 = func2(result);
    console.log(result2);
}
만들함수3("010-1111-2222", cutZero, removeDash); //1011112222 출력잘됨
let 네모 = { color: "red", width: 100 };
let 변수 = { name: "kim", age: 90 };
let 상품 = {
    brand: "Samsung",
    serialNumber: 1360,
    model: ["TV", "phone"],
};
let 장바구니 = [
    { product: "청소기", price: 7000 },
    { product: "삼다수", price: 800 },
];
let product = { product: '청소기', price: 7000, card: false };
