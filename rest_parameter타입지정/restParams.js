function 함수3(num, ...a) {
    //rest parameter parameter를 제한 없이 받을 수 있으며 맨뒤에만 사용가능
    console.log(a);
}
함수3(1, 5, 3, 5, 3, 2, 6);
//추가!!
let person = { student: true, age: 20 };
function 함수4({ student, age }) {
    console.log(student, age);
}
함수4({ student: true, age: 20 });
//하나더!!
function 최댓값(...x) {
    let result = 0;
    x.forEach((i) => {
        if (result < i) {
            result = i;
        }
    });
    return result;
}
console.log(최댓값(4, 6, 3, 2));
function 함수6({ user, comment, admin }) {
    console.log(user, comment, admin);
}
함수6({ user: 'kim', comment: [3, 5, 4], admin: false });
function 함수7([a, b, c]) {
    console.log(a, b, c);
}
함수7([40, 'wine', false]);
