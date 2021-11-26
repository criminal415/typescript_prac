function 함수(x) {
    return x[0];
}
let b = 함수([4, 2]); //<number>가 함수에 파라미터로 입력 되어 MyType자리에 모두 들어간다.
console.log(b + 1);
function 함수2(x) {
    return x.length; // MyType 자리에 무슨 Type이 들어올지 모르는데 어떻게 뺄셈을 하냐? string들어오면? 미리 경고해주는 에러
} // 여기서의 extends는 복사가 아닌 제한의 개념으로 쓰인다.(constranints)(if문이랑 비슷)
let c = 함수2(['100']);
//(참고) class도 class <MyType> {} 이런 식으로 만들면 new로 뽑을 때 타입파라미터를 집어넣을 수 있다.
// type Age<MyType> = MyType 이런 식으로 타입변수에도 사용가능!!
//활용 예시 1
function 함수3(x) {
    console.log(x.length);
}
함수3('hello');
함수3(['kim', 'park']);
let data = '{"name" : "dog", "age" : 1 }';
function 함수4(x) {
    return JSON.parse(x);
}
let result = 함수4(data);
console.log(result);
//활용 예시 3
class Person3 {
    constructor(a) {
        this.name = a;
    }
}
let d = new Person3('어쩌구');
d.name; //string 타입
