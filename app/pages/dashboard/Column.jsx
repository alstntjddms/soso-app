import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CustomCard from "@/app/components/card/CustomCard";
import { ScrollShadow } from "@nextui-org/react";

export default function Column(props) {
  const { columnDatas, index, title } = props;
  useEffect(() => {}, [columnDatas]);

  const handleCardClick = (title) => {
    alert(title);
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
                      key={key.seq.toString()}
                      onClick={() => handleCardClick(key.title)}
                    >
                      <Draggable
                        // key={key.seq.toString()}
                        draggableId={key.seq.toString()}
                        index={key.index}
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
                                  ? "1px solid red"
                                  : null,
                              }}
                            >
                              <CustomCard
                                index={key.index}
                                title={key.title}
                                content={key.content}
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
