import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import initialData from "./initialData";
import TaskColumn from "./components/TaskColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { cloneDeep, find, findIndex, uniqueId } from "lodash";

function App() {
    const [data, setData] = useState(initialData);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const newData = cloneDeep(data);

        const sourceIndex = findIndex(newData, { id: source.droppableId });
        const taskObject = find(newData[sourceIndex].tasks, { id: draggableId });
        newData[sourceIndex].tasks.splice(source.index, 1);

        const destinationIndex = findIndex(newData, { id: destination.droppableId });
        newData[destinationIndex].tasks.splice(destination.index, 0, taskObject);

        // const sourceColumn = find(data, { id: source.droppableId });
        // const newSourceColumnTasks = Array.from(sourceColumn.tasks);
        // newSourceColumnTasks.splice(source.index, 1);
        setData(newData);
    };

    const onAddTask = (column) => {
        const id = uniqueId(column.key + "-task-");

        setData((prevData) => {
            let newData = [...prevData];
            let columnIndex = findIndex(prevData, { id: column.id });
            let columnObj = newData[columnIndex];
            newData[columnIndex] = {
                ...columnObj,
                tasks: [...newData[columnIndex].tasks, { id, title: "", description: "" }],
            };
            console.log(newData);
            return newData;
        });
    };

    return (
        <div className="w-full min-h-screen flex items-start p-5 gap-x-5 bg-violet-500">
            <DragDropContext onDragEnd={onDragEnd}>
                {data.map((column) => (
                    <TaskColumn key={column.id} {...column} onAddTask={() => onAddTask(column)} />
                ))}
            </DragDropContext>
        </div>
    );
}

export default App;
