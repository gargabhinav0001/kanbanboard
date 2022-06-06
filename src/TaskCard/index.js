import React from "react";
import "./index.css";
import rightArrowImg from "../assets/right-arrow.png";
import leftArrowImg from "../assets/arrow-left.png";
export default function TaskCard(props) {
  const deleteTask = (id) => {
    props.handleCallbackToDeleteTask(id);
  };

  return (
    <div className="card">
      <h4 className="taskName">{props.data.taskName}</h4>

      {/* do not show if item is in TO-DO list:  */}
      <div className="funcBtn">
        <div className="arwBtnGrp">
          {props.data.parentId != 1 && (
            <button className="arw">
              <img
                style={{ height: "20px" }}
                src={leftArrowImg}
                onClick={() => {
                  props.previousStageOfTask(props.data.parentId, props.data.id);
                }}
              ></img>
            </button>
          )}
          {props.data.parentId != 3 && (
            <button className="arw">
              <img
                style={{ height: "20px" }}
                src={rightArrowImg}
                onClick={() => {
                  props.nextStageOfTask(props.data.parentId, props.data.id);
                }}
              ></img>
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            deleteTask(props.id);
          }}
          className="button-danger"
        >
          Remove Task
        </button>
      </div>
    </div>
  );
}
