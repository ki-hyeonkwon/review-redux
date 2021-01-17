import React from "react";
import { connect } from "react-redux";
import { actionCreater } from "../store";

const List = ({ toDo, deleteToDo }) => {
  const deleteList = () => {
    deleteToDo(toDo.id);
  };

  return (
    <li>
      {toDo.text}
      <button onClick={deleteList}>delete</button>
    </li>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteToDo: id => dispatch(actionCreater.deleteToDo(id)),
  };
};

export default connect(null, mapDispatchToProps)(List);
