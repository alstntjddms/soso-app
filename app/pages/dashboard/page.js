"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import reorder, { reorderQuoteMap } from "./reorder";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";

// const items = {
//   요청: [
//     { index: 1, title: "타이틀1", content: "테스트 콘텐트 1-1" },
//     { index: 2, title: "타이틀2", content: "테스트 콘텐트 1-2" },
//   ],
//   진행중: [
//     { index: 3, title: "타이틀3", content: "테스트 콘텐트 2-1" },
//     { index: 4, title: "타이틀4", content: "테스트 콘텐트 2-2" },
//   ],
//   완료: [
//     { index: 5, title: "타이틀5", content: "테스트 콘텐트 3-1" },
//     { index: 6, title: "타이틀6", content: "테스트 콘텐트 3-2" },
//     { index: 7, title: "타이틀7", content: "테스트 콘텐트 3-2" },
//   ],
// };

export default function () {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  // const [columns, setColumns] = useState(items);
  const [ordered, setOrdered] = useState(Object.keys(items));

  const updateData = (data) => {
    dispatch({ type: "setItems", data: data });
  };

  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        // console.log("1111");
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
      // dispatch({ type: "setItems", data: orderedColumns });
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
                style={{ margin: "3%" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {ordered.map((key, index) => (
                  <div key={key} className="min-w-screen min-h-screen">
                    <Column
                      index={index}
                      title={key}
                      columnDatas={items[key]}
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
