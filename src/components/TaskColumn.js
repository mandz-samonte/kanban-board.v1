import React from "react";
import TaskCard from "./TaskCard";
import { AiOutlinePlus } from "react-icons/ai";
import { Droppable } from "react-beautiful-dnd";

export default function TaskColumn({ id, title, tasks, onAddTask }) {
    return (
        <div className="flex flex-col w-64 bg-slate-200 p-5 rounded-md">
            <span className="text-lg font-bold py-2 px-3 hover:bg-slate-50 rounded-md cursor-pointer mb-5">
                {title}
            </span>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col">
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} index={index} {...task} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <button
                onClick={onAddTask}
                className="w-full flex items-center justify-center gap-x-2 px-5 py-3 bg-violet-500 text-white rounded-md font-semibold uppercase text-sm"
            >
                <AiOutlinePlus />
                Add Task
            </button>
        </div>
    );
}
