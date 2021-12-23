//class 많이 만들어서 개발
//public private protected static 키워드 유용!
class User3 {
  // public name; //사실 public 안붙여도 자동으로 붙여주기 때문에 크게 문제될게 없다!! 자식들이 쓸 수 있게 해주는 기능!
  private name; //자식들이 수정할 수 없다. 보호하고 싶은 속성들이 있을 때 사용!
  constructor(a) {
    this.name = a;
  }
}

let 유저1 = new User3('park');

//private 키워드 사용 예시
class User4 {
  name: string;
  private familyName: string = 'kim'; //class 내에서만 변경 가능! 불러오기 가능!
  constructor(a) {
    this.name = a + this.familyName;
  }
  이름변경함수(a) {
    this.familyName = a;
  }
}
let 유저2 = new User4('민수');
console.log(유저2); //자식이 familyName을 불러올 수도 가져다 쓸 수도 없다!
//but 자식들도 변경할 수 있게 만들 수 있다. class 안에 함수제작!
유저2.이름변경함수('park');

//public 활용 예시
class Person2 {
  constructor(public name: string) {}
}
let 자식 = new Person2('kim');
console.log(자식); //public 키워드 사용하면 this. 을 생략가능

//protected 키워드
class User6 {
  protected x = 10; //protected 는 extends 된 class안에서 사용가능, 자식들은 여전히 사용불가!
}
class NewUser2 extends User6 {
  doThis() {
    this.x = 20;
  }
}

//static 키워드
class User7 {
  static x = 10; //부모 class에 직접 부여됨 (자식에게 안물려줌, extends하면 잘 따라옴)
  //private/protected/public + static 가능
  y = 20; // 자식만 사용가능! constructor도 마찬가지
}
let 자식2 = new User7();
console.log(자식2); // User7 {y : 20} 만 출력됨
console.log(User7.x); //10 출력됨 부모에게 직접 요청해야한다!!

//static 활용 예시 주로
// 주로 class 안에 간단한 메모를 하거나, 기본 설정값을 입력하거나
// class로 부터 생성되는 object가 사용할 필요가 없는 변수들을 만들어놓고 싶을 때 사용합니다.
class User8 {
  static skill = 'js';
  intro = User8.skill + '전문가입니다.';
}

let 철수 = new User8();
console.log(철수); //"js전문가입니다."

User8.skill = 'ts';

let 철수2 = new User8();
console.log(철수2); //"ts전문가입니다."

// 하지만 보통 class 내부의 기본 변수같은걸 static을 사용하여 수정할 일은 별로 없습니다.
// 수정하고 싶으면 private 쓰고 그 다음에 수정함수를 만들어서 사용하는게 더 안전한 방법이다.

class User9 {
  private static x = 10;
  public static y = 20;
  protected z = 30;
}
//필드값은 모든 User의 자식들에게 물려주는 속성 but static 키워드가 붙어있어서 User9.x 의 형식으로만 접근해서 쓸 수 있다.
//User9의 자식들은 x와 y를 쓸 수 없다.
//private static x 는 class 내부에서만 수정가능!
//public static은 class 내외부 상관없이 수정가능! public 키워드를 지워도 똑같이 동작
//protected z 는 private 키워드와 유사하게  class 내부에서만 사용 가능! but private와 다르게 extends로 복사된 class 내부에서도 사용 가능!!

//활용 예시 1
class User10{
  private static x = 10;
  public static y = 20;

  static addOne(파라미터: number) {
    User10.x += 파라미터;
  }

  static printX() {
    console.log(User10.x);
  }
}
User10.addOne(3);
User10.addOne(10);
User10.printX();
