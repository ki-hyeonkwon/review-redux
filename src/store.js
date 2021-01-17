import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

//action creater
const addToDo = text => {
  return {
    type: ADD,
    text,
  };
};

const deleteToDo = id => {
  return {
    type: DELETE,
    id,
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    case DELETE:
      const newToDos = state.filter(toDo => toDo.id !== action.id);
      return newToDos;
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreater = {
  addToDo,
  deleteToDo,
};

export default store;
