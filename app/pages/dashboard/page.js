"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Column from "./Column";
import reorder, {reorderQuoteMap} from "./reorder";

const items = {
  "1번": [
    { index: 1 ,title: "타이틀1", content:"테스트 콘텐트 1-1"},
    { index: 2 ,title: "타이틀2", content:"테스트 콘텐트 1-2"},
  ],
  "2번": [
    { index: 1 ,title: "타이틀3", content:"테스트 콘텐트 2-1"},
    { index: 2 ,title: "타이틀4", content:"테스트 콘텐트 2-2"},
  ],
  "3번": [
    { index: 1 ,title: "타이틀5", content:"테스트 콘텐트 3-1"},
    { index: 2 ,title: "타이틀6", content:"테스트 콘텐트 3-2"},
  ],
};


export default function () {
  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];

      withQuoteRemoved.splice(result.source.index, 1);

      const orderedColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setColumns(orderedColumns);
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const reorderedorder = reorder(ordered, source.index, destination.index);

      setOrdered(reorderedorder);

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });

    setColumns(data.quoteMap);
  };

  const [columns, setColumns] = useState(items);
  const [ordered, setOrdered] = useState(Object.keys(items));
  
  return (
    <div>
      <div className="bg-white">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
            // ignoreContainerClipping={Boolean(containerHeight)}
            // isCombineEnabled={isCombineEnabled}
          >
            {(provided) => (
              <div
                className="inline-flex min-h-screen"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {ordered.map((key, index) => (
                  <div key={key} className="min-w-screen min-h-screen">
                    <Column
                      index={index}
                      title={key}
                      columnDatas={columns[key]}
                    />
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
