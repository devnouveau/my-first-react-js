
# 1. State
props와 유사하지만 비공개이고, 컴포넌트에 의해 완전히 제어됨


## 1.1. class component와 local state 
```javascript
// 클래스 컴포넌트 (React.Componen를 확장함)
class Clock extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {date: new Date()}; // 생성자에서 초기 this.state를 지정함
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        {/* this.props.date가 아닌 this.state.date */}
      </div>
    );
  }
}
ReactDOM.render(
  <Clock />, // props 지정X
  document.getElementById('root')
);
```

## 1.2. State 사용시 주의사항
1. 직접 State 수정금지. setState()사용.(직접수정시 컴포넌트 재렌더링 안됨)
2. State업데이트는 비동기적일 수 있음.
3. State업데이트는 얕은병합
```javascript
...
    this.state = {
      posts: [],
      comments: []
    };
...
      this.setState({
        comments: response.comments
        // this.state.posts값 영향x
        // this.state.comments값 변화o
      });
```
## 1.3. 부모컴포넌트와 자식컴포넌트에서의 state */
react에서 데이터는 위에서 아래로 흐른다
```javascript
//자식컴포넌트
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
//부모컴포넌트
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  
  ...
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
        {/* 부모컴포넌트Clock의 this.state가 자식컴포넌트FormattedDate의 props로 전달됨 (하향식/단방향식 데이터 흐름) */}

        {/* // FormattedDate 컴포넌트는 date를 자신의 props로 받고, 이것이 Clock의 state로부터 왔는지, Clock의 props에서 왔는지, 수동으로 입력한 것인지 알 수 없음 (state의 로컬/캡슐화) */}
      </div>
    );
  }
}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)
```

# 2. Lifecycle
## 2.1. 생명주기 메소드
```javascript
//컴포넌트 클래스 
class Clock extends React.Component {
  // 생성자(초기 state값 설정)
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  // 생명주기 메소드
  // 컴포넌트가 DOM에 렌더링될 때마다 Mount, DOM이 삭제될 때마다 Unmount
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  // 세부 메소드(clockd의 state 변경)
  tick() {
    this.setState({
      date: new Date()
    });
  }
  // render함수
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
// 컴포넌트 호출
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

### 2.1. 생명주기 메소드와 setState() 작동방식
1.1. \<Clock />가 ReactDOM.render()로 전달
1.2.
React가 Clock 컴포넌트의 constructor를 호출
1.3.
Clock 컴포넌트의 this.state초기화

2.1.
React가 Clock 컴포넌트의 render()호출
2.2.
React가 렌더링 내용 인식
2.3.
React가 DOM을 업데이트

3.1.
Clock출력값이 DOM에 삽입
3.2.
React가 componentDidMount() 호출
3.3.
componentDidMount() 안에서 Clock 컴포넌트가 tick() 메소드 호출하는 타이머 설정하도록 브라우저에 요청

4.1. 
브라우저가 매초 tick()메소드 호출
4.2.
tick() 안에서 Clock컴포넌트는 setState()에 현재시각 객체를 호출하면서 UI업데이트
4.3.
setState호출로 인해 React는 state변경 인지하고, render()호출(화면에 표시될 내용을 알기 위해)
4.4.
render()안의 this.state.date 변경 및 DOM 업데이트

5.1.
Clock컴포넌트가 DOM에서 한 번이라도 삭제된 적 있으면 react는componentWillUnmount() 호출


### 참조링크
https://ko.reactjs.org/docs/state-and-lifecycle.html