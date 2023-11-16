import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import CustomCard from "@/app/components/card/CustomCard";
import { useDispatch } from "react-redux";

export default function Column(props) {
  const dispatch = useDispatch();
  const { index, title } = props;
  // const [columnDatas, setColumnDatas] = useState(props.columnDatas);
  const columnDatas = props.columnDatas;
  // useEffect(() => {
  //   dispatch({ type: "openTransLoading" });
  //   setColumnDatas(props.columnDatas);
  //   setTimeout(() => {
  //     dispatch({ type: "closeTransLoading" });
  //   }, 500);
  // }, [props.columnDatas]);

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
                      key={key.seq.toString()}
                      onClick={() => handleCardClick(key)}
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
