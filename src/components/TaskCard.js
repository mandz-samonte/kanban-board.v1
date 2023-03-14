import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useApp } from "../providers/AppProvider";

export default function TaskCard(props) {
    const { id, index, title, description } = props;
    const { taskModalRef } = useApp();

    const onClick = () => {
        taskModalRef.current?.show(props);
    };

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={onClick}
                    className="flex flex-col bg-white rounded-lg p-5 cursor-pointer mb-5"
                >
                    {title ? <span>{title}</span> : <span className="italic text-zinc-400">Click to write task</span>}
                    <p>{description}</p>
                </div>
            )}
        </Draggable>
    );
}
