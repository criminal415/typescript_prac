let Name2 = 'kim';
let Age = 28;
let mariage = false;
let Users = ['kim', 'park'];
let Users_ojt = { member1: 'kim', member2: 'park' };
//ex)
let project = {
    member: ['kim', 'park'],
    days: 30,
    started: true,
};
//myfunction 변수 값은 받지만 리턴은 없을때 void type
function myfunction(x) {
    x * 2;
}
function myfunc2(x) {
}
// type narrowing!! type 엄격하게!!!
function myfunc3(x) {
    if (typeof x === 'string') { //if문 등으로 narrowing 한다
        return x + '1';
    }
    else {
        return x + 1;
    }
}
//ex)
function myfunc4(x) {
    let array = [];
    if (typeof x === 'number') {
        array[0] = x;
    }
    else { //if문 썻으면 끝까지 써야 안전하다 else,else if 안쓰면 에러로 잡아줄 수도 있다
    }
    // Narrowing으로 판정해주는 문법들 
    //typeof 변수, 속성명 in 오브젝트자료, 인스턴스 instanceof 부모
}
//Assertion 문법
function myfunc5(x) {
    let array = [];
    array[0] = x; //x를 number type으로 주장하기 실제로 string type이 number typeㅇ로 바뀌진 않는다
}
;
//assertion 문법 narrowing 할 때 쓴다 타입을 바꿀때는 아님!!
//무슨 타입이 들어올지 100% 확실할 때 쓰인다(따라서 if문으로 가능한걸 굳이 as 안쓴다)
//assertion 하면 아래와 같은 코드에서 버그를 캐치 못한다.(따라서 남의 코드를 수정할때 왜 타입에러가 나는지 모르겠을때 비상용으로 as 사용!)
myfunc5('123');
function 변환기(data) {
    return JSON.parse(data);
}
const jake = 변환기('{"name":"kim"}');
//예제1 배열에 숫자 외에 문자 type이 들어왔을때 모두 숫자 type으로 cleaning해주고 타입지정까지 확실하게
function 클리닝함수(a) {
    let 클리닝완료된거 = [];
    a.forEach((b) => {
        if (typeof b === 'string') {
            클리닝완료된거.push(parseFloat(b));
        }
        else {
            클리닝완료된거.push(b);
        }
    });
    return 클리닝완료된거;
}
console.log(클리닝함수([123, '3']));
//예제2
function 만들함수1(x) {
    if (typeof x.subject === 'string') {
        return x.subject;
    }
    else if (Array.isArray(x.subject)) {
        return x.subject[x.subject.length - 1];
    }
    else {
        return '없쪄';
    }
}
console.log(만들함수1({ subject: ['english', 'art'] }));
