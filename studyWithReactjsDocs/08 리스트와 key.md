# 리스트와 Key

## 1. 컴포넌트 목록 렌더링 
Array.map()을 이용함
```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}> {/* 배열 엘리먼트에 key 반드시 지정해야 함*/}
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```


## 2. Key

### 2.1. Key ?
- react가 어떤 항목을 변경/추가/삭제할지 식별하게 함(배열내부에서 항목을 고유하게 식별할 수 있는 값을 사용해야 함)
- 배열내부 엘리먼트에 지정
- 주로 데이터의 ID를 key로 사용
- key지정하지 않을 경우 항목의 index를 key로 사용(권장 X)
- 컴포넌트로 전달되지 않음
    ```javascript
    const content = posts.map((post) =>
        <Post
            key={post.id} 
            id={post.id}
            title={post.title} />
        );
    // post.id값을 key로는 전달불가. 별도의 prop(여기서는 id)으로 전달해야 함 
    ```
### 2.2. Key로 컴포넌트 추출하기
```javascript
function ListItem(props) {
  return <li>{props.value}</li>; 
  // 여기에 key지정 X
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} /> 
    // 여기에 key 지정 O (개별 li엘리먼트가 아닌, listItem자체에 key가 있어야 함)
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

## 2.3. 형제사이에서 고유한 값
서로 다른 배열끼리는 동일한 key값 사용 가능
```javascript
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>{/* content와 동일한 key 사용가능 */}
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>{/* sidebar와 동일한 key 사용가능 */}
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}<hr />{content}
    </div>
  );
}
```

## 2.4. JSX에서의 목록 렌더링 
- map()을 인라인으로 처리
- map 함수가 너무 중첩된다면 컴포넌트로 추출하는 것을 권장
```javascript
// JSX에서 표현식 사용하는 경우
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}

// javascript코드로만 처리하는 경우
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} /> 
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

