import React from "react";
import List from "./list";

const ToDos = ({ toDos }) => {
  return (
    <ul>
      {toDos.map(toDo => {
        return <List toDo={toDo} key={toDo.id} />;
      })}
    </ul>
  );
};

export default ToDos;
