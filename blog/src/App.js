/* eslint-disable */ // 컴파일 warning에러메시지 표시하지 않게 함
/* react모듈에서 default export인 React와, 하나의 멤버 useState를 import해옴 */
import React, { useState } from 'react'; 
// import logo from './logo.svg';
import './App.css';



function App() { //function component

/* 
  // 변수,함수로 데이터바인딩하는 경우
  let posts = "서버에서 가져온 글";
  function 함수() {
    return 100;
  }
*/  


/*
  State
  1. 리액트에서, 변수대신 쓰는 저장공간
  2. react모듈에서 가져온 useState()를 이용해서 생성
  3. 문자, 숫자, array, object 저장가능

  State로 데이터바인딩 하는 이유 
  1. 웹을 app처럼 동작하게 하기 위해. 
  (state가 변경되면 HTML이 자동으로 재렌더링 됨)

  Array, Object State 값을 변경하기 ( 리액트는 원칙적으로 데이터를 직접수정 X _immutable data ))
  1. 기존 state의 카피본 생성(deep copy해야 제대로 복사됨)
  2. 카피본에 수정사항 반영
  3. state변경함수(대체할 데이터)로 값 변경
*/

  // var [a,b] = [10,100];  // ES6 destructuring 문법. array, object에 있던 자료를 변수에 쉽게 담을 수 있음. 

/* s: 리액트의 데이터 저장공간 state 만들기.*/
  let [글제목,글제목변경함수] = useState(['파이썬기초', '이펙티브자바', 'ES6']);   // -> [a,b] array가 생성됨.
  let [따봉,따봉변경함수] = useState(0); 
/* e: 리액트의 데이터 저장공간 state 만들기.*/

/* s: State 변경하기 */
  function 제목바꾸기() {
    // 글제목[1] = 1; // -> 값 직접 대입시 state변경 및 재렌더링이 정상적으로 되지 않음
    // 글제목변경함수(['가방추천', '라면맛집', '자바기초']); // state를 대체해주는 함수를 사용해야 함.
    
    // 일단 state의 복사본을 만들어서 state를 수정해야 함.
    // var newArray = 글제목 // 값 공유가 되기 때문에 state를 제대로 복사한 게 아니게 됨.
    var newArray = [...글제목]; // 1. ...이라는 spread operator사용해서, state를 deep copy해야 함.
    newArray[0] = 'php'; // 2. 카피본에 수정사항 반영
    글제목변경함수(newArray); // 3. state변경함수에 카피본을 매개변수로 하여 state변경
  }

  function 정렬() {
    var newArray = [...글제목]; 
    newArray = newArray.sort();
    글제목변경함수(newArray);
  }
/* e: State 변경하기 */




  /* JSX에서 javascript코드는 {}내에 작성한다. */

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
        {/* <div style={ {color:'blue' , fontSize:'30px'} }>개발 Blog</div>    */}
        {/* JSX에서 style속성값은 {}내에, object형식으로 입력해야 함. css속성명도 camelCase로 변경해서 입력 */}
      </div>

      {/* s: JSX에서 변수,함수로 데이터바인딩하는 경우 */}

      {/* <h4>{ posts }</h4> */}
      {/* 데이터바인딩 :: {} 내에 변수명을 입력하면 값이 출력됨 */}
      
      {/* <h4>{ 함수() }</h4> */}
      {/* 데이터바인딩 :: {} 내에 함수명()을 입력하면 리턴값이 출력됨 */}
      
      {/* <img src={ logo } alt="" /> */}
      {/* 데이터바인딩 :: import해온 모듈/객체명을 {}내에 삽입해 속성값으로 사용 */}

      {/* e: JSX에서 변수,함수로 데이터바인딩하는 경우 */}


      {/* s: JSX에서 이벤트처리 */}
      <button onClick={ 제목바꾸기 }>제목변경버튼</button> {/* onClick={ 제목바꾸기() } 아님!! ()쓰지말고 입력 */}
      <button onClick={ 정렬 }>정렬버튼</button> 
      
      <div className="list">
        {/* JSX에서는 class가 아닌 className */}

        {/* s: JSX에서 이벤트처리 */}
        <h3> { 글제목[0] } <span onClick={ ()=>{ 따봉변경함수(따봉+1) } }>👍</span> { 따봉 } </h3> 
        {/*  { 글제목[0] } : state에 저장된 데이터를 출력함 */}
        {/* onClick으로 이벤트 사용. {}내에는 반드시 함수가 들어가야 함. */}
      
        <p>m월 d일 발행</p>
        <hr />
      </div>
      {/* e: JSX에서 이벤트처리 */}


      <div className="list">
        <h3> { 글제목[1] } </h3> 
        <p>m월 d일 발행</p>
        <hr />
      </div>

      <div className="list">
        <h3> { 글제목[2] } </h3> 
        <p>m월 d일 발행</p>
        <hr />
      </div>

      {/* s: 리액트의 Component문법 */}
      {/* 
      <div className="modal">
        <h2>제목</h2>
        <p>날짜</p>
        <p>상세내용</p>
      </div> 
      */}
      {/* 위의 태그를 아래와 같이 컴포넌트를 이용하여 출력할 수 있다. */}

      <Modal></Modal>{/* 함수명을 태그처럼 사용 */}
      {/* e: 리액트의 Component문법 */}

    </div>

  );
}


/* s: 리액트의 Component문법 */
function Modal() {
  return (
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}
/* e: 리액트의 Component문법 */

/*
  컴포넌트 유의사항
  1. 이름은 대괄호
  2. return() 안에 있는 건 태그 하나로 묶어야 함 (fragment<></>를 사용해도 됨)

  컴포넌트에 유리한 경우
  1. HTML덩어리가 반복 출현하는 경우
  2. HTML UI의 재렌더링이 잦은 경우
  3. 다른 페이지를 만들떄

  컴포넌트 단점
  1. state쓸 때 복잡해짐(상위컴포넌트에서 만든 state이용시 props이용해야 함)
*/


export default App;

