import React, { useState } from "react";
import TaskCard from "../TaskCard/index";
import "./index.css";
export default function TasksList(props) {
  const [idOfLists, setIdOfLists] = [
    [
      {
        name: "ToDoItems",
        id: 1,
      },
      {
        name: "InProgressItems",
        id: 2,
      },
      {
        name: "FinishedItems",
        id: 3,
      },
    ],
  ];
  const [toDoItems, setToDoItems] = useState([
    {
      id: 1,
      parentId: 1,
      taskName: "First Task",
      taskStartAt: "",
      taskEndAt: "",
    },
    {
      id: 2,
      parentId: 1,
      taskName: "Second Task",
      taskStartAt: "",
      taskEndAt: "",
    },
    {
      id: 3,
      parentId: 1,
      taskName: "Third Task",
      taskStartAt: "",
      taskEndAt: "",
    },
  ]);
  const [inProgressItems, setInProgressItems] = useState([
    {
      id: 4,
      parentId: 2,
      taskName: "Fourth Task",
      taskStartAt: "",
      taskEndAt: "",
    },
    {
      id: 5,
      parentId: 2,
      taskName: "Fifth Task",
      taskStartAt: "",
      taskEndAt: "",
    },
    {
      id: 6,
      parentId: 2,
      taskName: "Sixth Task",
      taskStartAt: "",
      taskEndAt: "",
    },
  ]);
  const [finishedItems, setFinishedItems] = useState([
    {
      id: 7,
      parentId: 3,
      taskName: "Seventh Task",
      taskStartAt: "",
      taskEndAt: "",
    },
    {
      id: 8,
      parentId: 3,
      taskName: "Eighth Task",
      taskStartAt: "",
      taskEndAt: "",
    },
    {
      id: 9,
      parentId: 3,
      taskName: "Ninth Task",
      taskStartAt: "",
      taskEndAt: "",
    },
  ]);

  const handleCallbackToDeleteToDoItems = (id) => {
    let newList = toDoItems.filter((item) => item.id !== id);
    setToDoItems(newList);
  };
  const handleCallbackToDeleteInProgressItems = (id) => {
    let newList = inProgressItems.filter((item) => item.id !== id);
    setInProgressItems(newList);
  };
  const handleCallbackToDeleteFinishedItems = (id) => {
    let newList = finishedItems.filter((item) => item.id !== id);
    setFinishedItems(newList);
  };

  const [newTaskName, setNewTaskName] = useState("");

  const newTaskFunc = (e) => {
    setNewTaskName(e.target.value);
  };
  const saveNewTask = (e) => {
    e.preventDefault();
    if (newTaskName != "") {
      let newTaskObj = {
        id: newTaskName + Math.floor(Math.random() * 1000),
        taskName: newTaskName,
        taskStartAt: "",
        taskEndAt: "",
        parentId: 1,
      };
      setNewTaskName("");
      toDoItems.push(newTaskObj);
    }
  };

  const nextStageOfTask = (parentId, taskId) => {
    switch (parentId) {
      case 1:
        let newValue = toDoItems.filter((item) => item.id === taskId);
        newValue[0].parentId = 2;
        let newList = [...inProgressItems, newValue[0]];
        setInProgressItems(newList);
        newValue = toDoItems.filter((item) => item.id != taskId);
        setToDoItems(newValue);

        break;
      case 2:
        let newValue2 = inProgressItems.filter((item) => item.id === taskId);
        newValue2[0].parentId = 3;
        let newList2 = [...finishedItems, newValue2[0]];
        setFinishedItems(newList2);
        newValue2 = inProgressItems.filter((item) => item.id != taskId);
        setInProgressItems(newValue2);
        break;
      case 3:
        alert("Not valid action");
        break;
      default:
        alert("Error Occured");
    }
  };

  const previousStageOfTask = (parentId, taskId) => {
    switch (parentId) {
      case 1:
        alert("Not valid action");
        break;
      case 2:
        let newValue = inProgressItems.filter((item) => item.id === taskId);
        newValue[0].parentId = 1;
        let newList = [...toDoItems, newValue[0]];
        setToDoItems(newList);
        newValue = inProgressItems.filter((item) => item.id != taskId);
        setInProgressItems(newValue);

        break;
      case 3:
        let newValue2 = finishedItems.filter((item) => item.id === taskId);
        newValue2[0].parentId = 2;
        let newList2 = [...inProgressItems, newValue2[0]];
        setInProgressItems(newList2);
        newValue2 = finishedItems.filter((item) => item.id != taskId);
        setFinishedItems(newValue2);

        break;
      default:
        alert("Error Occured.");
    }
  };

  return (
    <div className="body-bg">
      <form className="form" type="submit" id="form" onSubmit={saveNewTask}>
        <input
          className="input"
          type="text"
          onChange={newTaskFunc}
          value={newTaskName}
          placeholder="Add new task."
        />
        <button type="submit" form="form" className="button-success">
          Add task.
        </button>
      </form>

      {/* main grid */}
      {toDoItems.length == 0 &&
      finishedItems.length == 0 &&
      inProgressItems.length === 0 ? (
        <h1 className="messageToAdd">Add tasks to proceed.</h1>
      ) : (
        <div className="mainGrid">
          <div className="list">
            <h3 className="taskHeading">To-Do tasks:</h3>{" "}
            {toDoItems.length > 0 ? (
              toDoItems.map((task, index) => {
                return (
                  <TaskCard
                    data={task}
                    key={index}
                    id={task.id}
                    handleCallbackToDeleteTask={handleCallbackToDeleteToDoItems}
                    nextStageOfTask={nextStageOfTask}
                    previousStageOfTask={previousStageOfTask}
                  />
                );
              })
            ) : (
              <h4 className="noItemsmessage">No TO-DO items.</h4>
            )}
          </div>

          <div className="list">
            <h3 className="taskHeading">In Progress tasks: </h3>
            {inProgressItems.length > 0 ? (
              inProgressItems.map((task, index) => {
                return (
                  <TaskCard
                    data={task}
                    key={index}
                    id={task.id}
                    handleCallbackToDeleteTask={
                      handleCallbackToDeleteInProgressItems
                    }
                    nextStageOfTask={nextStageOfTask}
                    previousStageOfTask={previousStageOfTask}
                  />
                );
              })
            ) : (
              <h4 className="noItemsmessage">No IN-PROGRESS items.</h4>
            )}
          </div>

          <div className="list">
            <h3 className="taskHeading">Finished tasks: </h3>
            {finishedItems.length > 0 ? (
              finishedItems.map((task, index) => {
                return (
                  <TaskCard
                    data={task}
                    key={index}
                    id={task.id}
                    handleCallbackToDeleteTask={
                      handleCallbackToDeleteFinishedItems
                    }
                    nextStageOfTask={nextStageOfTask}
                    previousStageOfTask={previousStageOfTask}
                  />
                );
              })
            ) : (
              <h4 className="noItemsmessage">No FINISHED items.</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
