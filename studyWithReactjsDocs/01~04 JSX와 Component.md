# 1. JSX 
## 1.1. JSX특징
1. JSX에서는 {} 중괄호 내에 javascript 표현식이 작성됨
2.  JSX는 Babel이 React.createElement로 컴파일 하기 때문에 React 라이브러리 역시 JSX 코드와 같은 스코프 내에 존재해야만(import)함
3.  JSX에서 태그 내에 입력된 문자열리터럴은 props.children
4. JSX에서 태그 내의 처음과 마지막 공백,빈 줄은 자동으로 제거됨
5. react component는 element배열 반환 가능
```javascript
return [
    // key 지정을 잊지 마세요 :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
// JSX표현식 배열 렌더링
function Item(props) {
  return <li>{props.message}</li>;
}
function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
```
6. 자식 콜백 호출하여 반복되는 컴포넌트 생성 가능
```javascript
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}> //자식 콜백 numTimes
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```


# 2. React Component
## 2.1. React Component 특징
1. React에서 사용자정의 컴포넌트명은 대문자로 시작해야 함.
2. 컴포넌트 return 내에서 JSX사용
3. 컴포넌트함수는 순수함수여야 함(파라미터인 props값을 직접변경하면 안됨)

## 2.2. 컴포넌트 분해
### 컴포넌트 분해 전
```javascript
function formatDate(date) {
  return date.toLocaleDateString();
}
function Comment(props) { 
  return (  
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
### 컴포넌트 분해
1. UI일부가 중복사용될 때, UI일부의 내용이 복잡할 떄 별도의 컴포넌트로 추출하는 것이 좋음
2. 기존앱 -> React 통합시 작은 컴포넌트에서 뷰계층 상단으로 올라가면서 작업
```javascript
function formatDate(date) {
  return date.toLocaleDateString();
}
function Avatar(props) {
  return ( 
    <img
      className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      {/*Avatar 컴포넌트는 Comment에 종속되지 않은 하나의 별개의 컴포넌트로 간주(추후 재사용위해)하여, props명을 author보다 일반화된 user로 변경*/}
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function Comment(props) { // 부모 컴포넌트
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
## 3. 컴포넌트 렌더링
1.  ReactDOM의 render함수 사용
2.  render(<컴포넌트명 속성명=속성값/>,
3.  렌더링할html DOM)
4.  props의 기본값은 true
5.  props의 값은 escape되지 않음
6.  JSX의 내용은 기본적으로 escape되어 렌더링됨(XSS방지)

```javascript
const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};
ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  document.getElementById('root')
);
```

### 참조링크
https://ko.reactjs.org/docs/hello-world.html
https://ko.reactjs.org/docs/introducing-jsx.html
https://ko.reactjs.org/docs/rendering-elements.html
https://ko.reactjs.org/docs/components-and-props.html