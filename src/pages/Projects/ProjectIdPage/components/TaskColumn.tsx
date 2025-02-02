import { cn } from "@/lib/utils"
import { getTaskStatus } from "../../helpers"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { TaskItemActions } from "./TaskItemActions"
import { TaskStatusEnum, TaskWithOrder } from "@/pages/Tasks/types"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export const TaskColumn = ({
  title,
  items,
  onClickAddTask,
  isProjectFinished,
}: {
  title: TaskStatusEnum
  items: TaskWithOrder[]
  onClickAddTask: () => void
  isProjectFinished: boolean
}) => {
  return (
    <div className="h-full w-[360px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-sm">
        <div className="rounded-t-md p-4 shadow-sm">
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
        <div className={cn("mt-2 flex min-h-[60px] flex-1 flex-col px-4")}>
          {title === TaskStatusEnum.PENDING && (
            <div className="mb-2 h-[52px] rounded-md border-2 bg-slate-200 shadow-sm">
              <Button
                className="flex h-auto w-full items-center justify-start rounded-md px-3 py-2 text-xl"
                variant={"ghost"}
                onClick={onClickAddTask}
                disabled={isProjectFinished}
              >
                <Plus className="mr-1 h-4 w-4" />
                Agregar
              </Button>
            </div>
          )}
          <Droppable droppableId={title} type="task">
            {(provided) => (
              <div
                className="flex flex-1 flex-col"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {items.map((task, index) => (
                  <Draggable
                    draggableId={task.id.toString()}
                    index={index}
                    key={task.id}
                    isDragDisabled={isProjectFinished}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={cn(
                          "mb-2 flex items-center justify-between truncate rounded-md border-2 bg-white px-3 py-2 text-xl shadow-sm",
                          {
                            "border-primary": snapshot.isDragging,
                          },
                        )}
                      >
                        <span className="truncate">{task.title}</span>
                        {!snapshot.isDragging && (
                          <TaskItemActions
                            task={task}
                            isProjectFinished={isProjectFinished}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  )
}

export const TaskColumnSkeleton = () => {
  return (
    <div className="rounded-md border bg-white p-4">
      <div className="mb-5 h-8 w-full rounded bg-gray-200" />
      <div className="mt-2 h-10 w-1/2 rounded bg-gray-200" />
      <div className="mt-2 h-10 w-2/3 rounded bg-gray-200" />
      <div className="mt-2 h-10 w-1/3 rounded bg-gray-200" />
      <div className="mt-2 h-10 w-2/3 rounded bg-gray-200" />
      <div className="mt-2 h-10 w-1/4 rounded bg-gray-200" />
    </div>
  )
}
