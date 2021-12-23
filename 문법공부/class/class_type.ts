class Person1 {
  name: string;
  constructor(a: string) {
    this.name = a;
  }
  data: number = 0;
  함수(a: string) {
    console.log('안녕' + a);
  }
}

let 사람1 = new Person1('kim');
let 사람2 = new Person1('park');

console.log(사람1.data);
console.log(사람1);
console.log(사람2);
사람1.함수('Ozam');

//예시 1
class Car {
  model: string;
  price: number;
  constructor(a: string, b: number) {
    this.model = a;
    this.price = b;
  }

  tax(): number {
    return this.price * 0.1;
  }
}

let car1 = new Car('소나타', 3000);
console.log(car1); //콘솔창 출력결과는 { model : '소나타', price : 3000 }
console.log(car1.tax()); //콘솔창 출력결과는 300

//예시 2
class Word {
  num;
  str;

  constructor(...param) {
    let 숫자들: number[] = [];
    let 문자들: string[] = [];

    param.forEach((i) => {
      if (typeof i === 'string') {
        문자들.push(i);
      } else {
        숫자들.push(i);
      }
    });

    this.num = 숫자들;
    this.str = 문자들;
  }
}

let obj = new Word('kim', 3, 5, 'park');
console.log(obj.num); //[3,5]
console.log(obj.str); //['kim', 'park']
