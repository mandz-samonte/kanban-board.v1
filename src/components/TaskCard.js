import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function TaskCard({ id, index, title, description }) {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex flex-col bg-white rounded-lg p-5 cursor-pointer"
                >
                    {title ? <span>{title}</span> : <span className="italic text-zinc-400">Click to write task</span>}
                    <p>{description}</p>
                </div>
            )}
        </Draggable>
    );
}
