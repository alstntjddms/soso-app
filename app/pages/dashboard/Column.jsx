import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CustomCard from "@/app/components/card/CustomCard";

export default function Column(props) {
  const { columnDatas, index, title } = props;
  useEffect(() => {
    console.log("Column Data1:", columnDatas);
    // console.log(props);
    // columnDatas.sort((a, b) => a.index - b.index);
  }, [columnDatas]);
  //   console.log("11111111 = " + props.key);
  // columnDatas.sort((a, b) => a.index - b.index);
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="flex flex-col">
            <div {...provided.dragHandleProps}>{title}</div>

            <Droppable droppableId={title}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {columnDatas.map((key, index) => (
                    <Draggable
                      key={key.seq.toString()}
                      draggableId={key.seq.toString()}
                      index={key.index}
                    >
                      {(provided2, snapshot) => (
                        <div
                          ref={provided2.innerRef}
                          {...provided2.draggableProps}
                        >
                          <div {...provided2.dragHandleProps}>
                            <CustomCard
                              index={key.index}
                              title={key.title}
                              content={key.content}
                              className="min-h-screen"
                            />
                          </div>
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
