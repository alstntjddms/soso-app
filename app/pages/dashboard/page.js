"use client";
import CustomCard from "@/app/components/card/CustomCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function () {
  return (
    <div className="bg-white">
      <DragDropContext>
        <div>
          <Droppable droppableId="cardlists">
            {(provided, snapshot) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable draggableId="first" index={0}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CustomCard />
                    </li>
                  )}
                </Draggable>
                <Draggable draggableId="secnd" index={1}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CustomCard />
                    </li>
                  )}
                </Draggable>
              </ul>
            )}
          </Droppable>
          {provided.placeholder}
        </div>
      </DragDropContext>
    </div>
  );
}
