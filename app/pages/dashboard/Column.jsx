import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

export default function Column(props) {
  const { columnDatas, index, title } = props;
  useEffect(() => {
    console.log("Column Data:", columnDatas);
  }, [columnDatas]);
  //   console.log("11111111 = " + props.key);

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="flex flex-col">
            <div
              {...provided.dragHandleProps}>{title}
            </div>

            <Droppable droppableId={title}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {columnDatas.map((item, index) => (

                    <Draggable key={item.title} draggableId={item.title} index={index}>
                      {(provided2, snapshot) =>(
                        <div ref={provided2.innerRef} {...provided2.draggableProps}>
                          <div {...provided2.dragHandleProps}>{item.title}</div>
                        </div>
                      )}
                    </Draggable>

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
