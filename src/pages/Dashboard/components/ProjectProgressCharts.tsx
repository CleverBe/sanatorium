import { utcToLocalDate } from "@/helpers/dates"
import { Project } from "@/pages/Projects/types"
import { TaskStatusEnum, Task } from "@/pages/Tasks/types"
import { differenceInDays, min, parseISO } from "date-fns"
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

export const ProjectProgressCharts = ({
  project,
  tasks,
}: {
  project: Project
  tasks: Task[]
}) => {
  const tasksGroups = [
    {
      name: "Pendientes",
      value: tasks.filter((task) => task.status === TaskStatusEnum.PENDING)
        .length,
    },
    {
      name: "En progreso",
      value: tasks.filter((task) => task.status === TaskStatusEnum.IN_PROGRESS)
        .length,
    },
    {
      name: "Completadas",
      value: tasks.filter((task) => task.status === TaskStatusEnum.COMPLETED)
        .length,
    },
  ]

  const projectStart = project.startDate
  const projectEnd = project.endDate
  const currentDate = new Date().toISOString().split("T")[0]

  const start = parseISO(projectStart)
  const end = parseISO(projectEnd)
  const today = parseISO(currentDate)

  const totalDays = differenceInDays(end, start)

  const daysElapsed = differenceInDays(min([today, end]), start)

  const timeSpent = [
    {
      name: "Transcurrido",
      value: daysElapsed,
    },
    {
      name: "Tiempo restante",
      value: totalDays - daysElapsed,
    },
  ]

  const COLORSFORTASKS = ["#0088FE", "#00C49F", "#FFBB28"]

  const COLORSFORTIME = ["#0088FE", "#00C49F", "#FFBB28"]

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      <div className="flex h-[400px] flex-col items-center justify-center rounded-md border p-4">
        <h1 className="text-lg">Progreso de tareas</h1>
        {tasks.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={tasksGroups}
                dataKey="value"
                fill="#8884d8"
                cx={"50%"}
                cy={"50%"}
                innerRadius={80}
                outerRadius={120}
              >
                {tasksGroups.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORSFORTASKS[index % COLORSFORTASKS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            No hay tareas aun
          </div>
        )}
      </div>
      <div className="flex h-[400px] flex-col items-center justify-center rounded-md border p-4">
        <h1 className="text-lg">Tiempo transcurrido</h1>
        <div className="flex">
          <p>
            <span className="font-semibold">
              {utcToLocalDate(projectStart)}
            </span>
            {" - "}
            <span className="font-semibold">{utcToLocalDate(projectEnd)}</span>
          </p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={timeSpent}
              dataKey="value"
              fill="#8884d8"
              cx={"50%"}
              cy={"50%"}
              innerRadius={80}
              outerRadius={120}
            >
              {timeSpent.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORSFORTIME[index % COLORSFORTIME.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
