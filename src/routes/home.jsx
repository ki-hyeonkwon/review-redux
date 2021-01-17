import React from "react";
import { connect } from "react-redux";
import ToDos from "../components/toDos";
import { actionCreater } from "../store";

const Home = ({ toDos, addToDo }) => {
  const formRef = React.createRef();
  const inputRef = React.createRef();

  const onSubmit = event => {
    event.preventDefault();
    const text = inputRef.current.value;
    text && addToDo(text);
    formRef.current.reset();
  };

  return (
    <>
      <h1>To Dos </h1>
      <form ref={formRef} onSubmit={onSubmit}>
        <input ref={inputRef} type="text" />
        <button>Add</button>
      </form>
      <ToDos toDos={toDos} />
    </>
  );
};

//순수함수, 동기적
const mapStateToProps = (state, ownProps) => {
  return { toDos: state };
};

const mapDispatchToProps = dispatch => {
  return {
    addToDo: text => dispatch(actionCreater.addToDo(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
