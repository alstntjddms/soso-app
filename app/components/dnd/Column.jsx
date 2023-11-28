import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CustomCard from "@/app/components/card/CustomCard";
import { useDispatch } from "react-redux";

export default function Column(props) {
  const dispatch = useDispatch();
  const { index, title } = props;
  const columnDatas = props.columnDatas;
  // columnDatas.sort((a, b) => a.dataIndex - b.dataIndex);

  const handleCardClick = async (data) => {
    dispatch({ type: "setData", data: data });
    dispatch({ type: "toggleShowData" });
  };

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="flex flex-col bg-stone-200 mr-4 border-solid border-2 border-indigo-950">
            <div
              className="font-bold text-large text-center bg-stone-700 text-white"
              {...provided.dragHandleProps}
            >
              {title}
            </div>
            <Droppable droppableId={title}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-64 h-96 overflow-auto p-2"
                >
                  {columnDatas.map((key, index) => (
                    <div
                      key={key.id.toString()}
                      onClick={() => handleCardClick(key)}
                    >
                      <Draggable
                        // key={key.seq.toString()}
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
                              style={{
                                border: snapshot2.isDragging
                                  ? "2px solid yellow"
                                  : null,
                                transform: snapshot2.isDragging
                                  ? "scale(1.1)"
                                  : null,
                              }}
                              className="hover:brightness-75"
                            >
                              <CustomCard
                                index={key.index}
                                data={key}
                                className="min-h-full"
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
