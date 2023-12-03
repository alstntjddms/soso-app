import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CustomCard from "@/app/components/card/CustomCard";
import { useDispatch } from "react-redux";
import sosoAPI from "../framework/api/sosoAPI";
import { HttpStatusCode } from "axios";

export default function Column(props) {
  const dispatch = useDispatch();
  const { index, title } = props;
  const columnDatas = props.columnDatas;

  const handleCardClick = async (data) => {
    await getData(data);
    dispatch({ type: "toggleShowData" });
  };

  const getData = async (data) => {
    await sosoAPI.get("/data/data/" + data.id).then((res) => {
      if (res.status === HttpStatusCode.Ok) {
        dispatch({ type: "setData", data: res.data });
      } else if (res.response.status === HttpStatusCode.BadRequest) {
        dispatch({ type: "toggleCommonError", data: res.response.data });
      }
    });
  };

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="flex flex-col mr-4 border-solid border-cyan-950 rounded-lg">
            <div
              className="font-bold text-large text-center bg-cyan-950 text-white rounded-t-lg"
              {...provided.dragHandleProps}
            >
              {title}
            </div>
            <Droppable droppableId={title}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-64 h-[400px] max-h-[400px] overflow-auto p-2 border-1 rounded-b-lg"
                >
                  {columnDatas.map((key, index) => (
                    <div
                      key={key.id.toString()}
                      onClick={() => handleCardClick(key)}
                    >
                      <Draggable
                        draggableId={key.id.toString()}
                        index={key.dataIndex}
                      >
                        {(provided2, snapshot2) => (
                          <div
                            className="mb-2 w-max-[100px] w-min-[100px]"
                            ref={provided2.innerRef}
                            {...provided2.draggableProps}
                          >
                            <div
                              {...provided2.dragHandleProps}
                              className="hover:brightness-75"
                            >
                              <CustomCard
                                index={key.index}
                                data={key}
                                className="min-h-full"
                                selectYn={snapshot2.isDragging}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          {/* <div>{columnData[0]}</div> */}
        </div>
      )}
    </Draggable>
  );
}
