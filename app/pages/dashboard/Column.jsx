import React, { useEffect, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function Column(props) {
  //   const [columnData, setColumnData] = useState(props.columnData);
  //   useState;
  useEffect(() => {
    console.log("11111111columnDatas = " + props.columnDatas);
    console.log(props);
  });
  //   console.log("11111111 = " + props.key);

  return (
    <Draggable draggableId={props.key} index={props.index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="flex flex-col">
            {/* <h1>{key}</h1> */}

            {/* {props.columnData.map((item, index) => (
              <div>{item.title}</div>
            ))} */}
          </div>
          {/* <div>{columnData[0]}</div> */}
        </div>
      )}
    </Draggable>
  );
}
