"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import Column from "./Column";
import reorder, { reorderQuoteMap } from "./reorder";

export default function Row(props) {
  // items 세팅, 수정
  const items = props.items;
  const updateData = props.updateData;

  const [ordered, setOrdered] = useState(Object.keys(items));

  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column = items[result.source.droppableId];
      const withQuoteRemoved = [...column];

      withQuoteRemoved.splice(result.source.index, 1);

      const orderedColumns = {
        ...items,
        [result.source.droppableId]: withQuoteRemoved,
      };
      updateData(orderedColumns);
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
      const reorderedorder = reorder(
        ordered,
        source.index,
        destination.index,
        false
      );
      setOrdered(reorderedorder);
      return;
    }

    const data = reorderQuoteMap({
      quoteMap: items,
      source,
      destination,
    });
    updateData(data.quoteMap);

    // dispatch({ type: "setItems", data: data.quoteMap });
  };

  useEffect(() => {
    console.log("items");
    console.log(items);
  }, [items]);

  return (
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
            className="inline-flex min-h-full m-[15px]"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {ordered.map((key, index) => (
              <div
                key={key}
                // style={{
                //   border: "1px solid red",
                // }}
              >
                <Column index={index} title={key} columnDatas={items[key]} />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
