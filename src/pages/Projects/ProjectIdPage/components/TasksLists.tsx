import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { TaskColumn } from "./TaskColumn"
import { TaskStatusEnum, TaskWithOrder } from "@/pages/Tasks/types"
import { useEffect, useState } from "react"
import { useMoveTask } from "../api/useMoveTask"

function reorder<T>(list: T[], sourceIndex: number, destinationIndex: number) {
  const result = Array.from(list)

  const [removed] = result.splice(sourceIndex, 1)

  result.splice(destinationIndex, 0, removed)

  return result
}

export interface ListWithTasks {
  id: TaskStatusEnum
  tasks: TaskWithOrder[]
}

export const TasksLists = ({
  lists,
  onClickAddTask,
}: {
  lists: ListWithTasks[]
  onClickAddTask: () => void
}) => {
  const [columns, setColumns] = useState(lists)

  const { mutateAsync: mutateMove } = useMoveTask()

  useEffect(() => {
    setColumns(lists)
  }, [lists])

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const listsCopy = structuredClone(lists)

    const sourceList = listsCopy.find((list) => list.id === source.droppableId)
    const destinationList = listsCopy.find(
      (list) => list.id === destination.droppableId,
    )

    if (!sourceList || !destinationList) return

    const sourceStatus = source.droppableId as TaskStatusEnum
    const destinationStatus = destination.droppableId as TaskStatusEnum

    if (sourceStatus === destinationStatus) {
      const reorderedTasks = reorder(
        sourceList.tasks,
        source.index,
        destination.index,
      )

      const task = sourceList.tasks[source.index]

      reorderedTasks.forEach((task, index) => {
        task.order = index + 1
      })

      const newLists = listsCopy.map((list) => ({
        ...list,
        tasks: list.id === sourceStatus ? reorderedTasks : list.tasks,
      }))

      setColumns(newLists)

      mutateMove({
        id: task.id,
        newOrder: destination.index + 1,
        newStatus: destinationStatus,
      }).catch(() => {
        setColumns(listsCopy)
      })
    } else {
      const newSourceTasks = [...sourceList.tasks]
      const newDestinationTasks = [...destinationList.tasks]

      const [movedTask] = newSourceTasks.splice(source.index, 1)

      movedTask.status = destinationStatus

      newDestinationTasks.splice(destination.index, 0, movedTask)

      newSourceTasks.forEach((task, index) => {
        task.order = index + 1
      })

      newDestinationTasks.forEach((task, index) => {
        task.order = index + 1
      })

      const newLists = listsCopy.map((list) => ({
        ...list,
        tasks:
          list.id === sourceStatus
            ? newSourceTasks
            : list.id === destinationStatus
              ? newDestinationTasks
              : list.tasks,
      }))

      setColumns(newLists)

      mutateMove({
        id: movedTask.id,
        newOrder: destination.index + 1,
        newStatus: destinationStatus,
      }).catch(() => {
        setColumns(listsCopy)
      })
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-full space-x-2 overflow-x-auto p-4 lg:space-x-4">
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            title={column.id}
            items={column.tasks}
            onClickAddTask={onClickAddTask}
          />
        ))}
        <div className="w-1 flex-shrink-0" />
      </div>
    </DragDropContext>
  )
}
