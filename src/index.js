import { createStore } from "redux";

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";

//// counter구현 ////

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");
number.innerText = 0;
// 🌟Reducer is func and 🌟ONLY Reducer can control(modify) datas(states)!
// 🌟reducer가 return하는건 app의 state(data)이다, 여야한다.
// (currnet State, action)
//2. 리듀서 생성
const countModifier = (count = 0, action) => {
  //5. 입력받은 action에 따라 state를 조작하여 리턴
  switch (action.type) {
    case "ADD":
      return count + 1;
    case "MINUS":
      return count - 1;
    default:
      return count;
  }
};

//1. 스토어 생성 후
//3. 생성된 reducer를 전달
const countStore = createStore(countModifier);

const onChange = () => {
  // console.log("there was a change on the store");
  number.innerText = countStore.getState();
};
countStore.subscribe(onChange);

// reducer의 두번째 인자로 들어가는 action은 disaptch를 통해서 전달!
//4.디스패치를 통해 action를 리듀서로 전달. (action은 리듀서와 소통하는 유일한 방법!!)
//action은 오브젝트 이다! 항상 type을 가져야하고, 그 키 값은 바뀔 수 없다.
// countStore.dispatch({ type: "ADD" });
// type를 const ADD = "ADD"라고 정의하여 사용하게된다면 오류가 났을 때 정확히 판단할 수 있을 것이다(js가 오류룰 출력할 것이기 때문이다.).

const handleAdd = () => {
  countStore.dispatch({ type: "ADD" });
};

const handleMinus = () => {
  countStore.dispatch({ type: "MINUS" });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

/*************************************************/
//// To Dos ////

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

//액션 타입
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//액션 생성자 함수
const addToDo = text => {
  return { type: ADD_TODO, text };
};
const deleteToDo = id => {
  return { type: DELETE_TODO, id };
};

//리듀서
const reducer = (state = [], action) => {
  // console.log(action);
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      // filter을 이용하여 state를 변경하는 것이 아닌 새로운 배열을 리턴한다
      const newToDos = state.filter(toDo => toDo.id !== action.id);
      return newToDos;
    default:
      return state;
  }
};

//스토어 생성
const toDosStore = createStore(reducer);

//dispatch
const dispatchAddToDo = text => {
  toDosStore.dispatch(addToDo(text));
};
const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  toDosStore.dispatch(deleteToDo(id));
};

//subscribe의 listener
const paintToDos = () => {
  const toDos = toDosStore.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "delete";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

toDosStore.subscribe(paintToDos);

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);

//// React Redux
ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById("root")
);
