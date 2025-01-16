import { cn } from "@/lib/utils"
import { getTaskStatus } from "../../helpers"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { TaskItemActions } from "./TaskItemActions"
import { Task, TaskStatusEnum } from "@/pages/Tasks/types"

export const TaskColumn = ({
  title,
  items,
  isDragging,
}: {
  title: TaskStatusEnum
  items: Task[]
  isDragging: boolean
}) => {
  return (
    <Droppable droppableId={title} type="task">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={cn(
            "rounded-md border",
            snapshot.isDraggingOver
              ? "bg-primary/5"
              : isDragging
                ? "bg-primary/10"
                : "",
          )}
        >
          <div className="rounded-t-md bg-white p-4">
            <h1
              className={cn("text-xl font-bold", {
                "text-red-500": title === TaskStatusEnum.PENDING,
                "text-yellow-500": title === TaskStatusEnum.IN_PROGRESS,
                "text-green-500": title === TaskStatusEnum.COMPLETED,
              })}
            >
              {getTaskStatus(title)}
            </h1>
          </div>
          <div className={cn("mt-2 flex flex-col px-4")}>
            {items.map((task, index) => (
              <Draggable
                draggableId={task.id.toString()}
                index={index}
                key={task.id}
              >
                {(provided, snapshot) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={cn(
                      "mb-2 flex items-center justify-between truncate rounded-md border px-3 py-2 text-xl",
                      {
                        "border-primary bg-white": snapshot.isDragging,
                      },
                    )}
                  >
                    <span className="truncate">{task.title}</span>
                    {!snapshot.isDragging && <TaskItemActions task={task} />}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}
