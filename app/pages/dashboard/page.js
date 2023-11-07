"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Column from "./Column";
import reorder, {reorderQuoteMap} from "./reorder";

const items = {
  "1번": [
    { title: "타이틀1", index: 1 },
    { title: "타이틀2", index: 2 },
  ],
  "2번": [
    { title: "타이틀3", index: 1 },
    { title: "타이틀4", index: 2 },
  ],
  "3번": [
    { title: "타이틀5", index: 1 },
    { title: "타이틀6", index: 2 },
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
                className="inline-flex min-h-screen min-w-screen"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {ordered.map((key, index) => (
                  <Column
                    key={key}
                    index={index}
                    title={key}
                    columnDatas={columns[key]}
                  />
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
