"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import Column from "./Column";
import reorder, { reorderQuoteMap } from "./reorder";
import { useDispatch } from "react-redux";

export default function Row(props) {
  const dispatch = useDispatch();

  // datas 세팅, 수정
  const datas = props.datas;
  const updateData = props.updateData;

  const [columns, setColumns] = useState(datas);
  const [ordered, setOrdered] = useState(Object.keys(datas));

  useEffect(() => {
    setOrdered(Object.keys(datas));
    setColumns(datas);
  }, [datas]);

  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        // transLoading();
        return;
      }

      const column = datas[result.source.droppableId];
      const withQuoteRemoved = [...column];

      withQuoteRemoved.splice(result.source.index, 1);

      const orderedColumns = {
        ...datas,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setColumns(orderedColumns);
      updateData(orderedColumns);
      // transLoading();
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      // transLoading();
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      // transLoading();
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
      // transLoading();
      return;
    }

    const data = reorderQuoteMap({
      quoteMap: datas,
      source,
      destination,
    });
    setColumns(data.quoteMap);
    updateData(data.quoteMap);
    // transLoading();
  };

  const transLoading = () => {
    setTimeout(() => {
      dispatch({ type: "closeTransLoading" });
    }, 500);
  };

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
                <Column index={index} title={key} columnDatas={columns[key]} />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
