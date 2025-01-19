import { Task } from "@/pages/Tasks/types"
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

interface CustomTooltipProps {
  active?: boolean
  payload?: {
    name: string
    value: number
  }[]
}

export const WorkDistributionCharts = ({ tasks }: { tasks: Task[] }) => {
  const COLORSFORPROJECTS = [
    "#0088fe",
    "#00c49f",
    "#ffbb28",
    "#ff8042",
    "#063970",
    "#76b5c5",
  ]

  const uniqueProjects = Array.from(
    new Set(tasks.map((task) => task.project.id)),
  ).map((id) => ({
    id,
    name: tasks.find((task) => task.project.id === id)!.project.name,
  }))

  const projectsGroups = uniqueProjects.map((project) => {
    const taskByProject = tasks.filter((task) => task.project.id === project.id)

    const totalHours = taskByProject.reduce(
      (acc, task) => acc + task.estimatedHours,
      0,
    )

    return {
      name: project.name,
      value: totalHours,
    }
  })

  const total = projectsGroups.reduce((acc, p) => acc + p.value, 0)

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(2)
      return (
        <div className="rounded-md border bg-white p-2 shadow-md">
          <p>{`${payload[0].name}: ${percentage}%`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      {/* PIE CHART */}
      <div className="flex h-[400px] flex-col items-center justify-center rounded-md border p-4">
        <h1 className="text-lg">Progreso de tareas</h1>
        {tasks.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={projectsGroups} dataKey="value" fill="#8884d8">
                {projectsGroups.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORSFORPROJECTS[index % COLORSFORPROJECTS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            No hay tareas aún
          </div>
        )}
      </div>

      {/* BAR CHART */}
      <div className="flex h-[400px] flex-col items-center justify-center rounded-md border p-4">
        <h1 className="text-lg">Distribución de horas por proyecto</h1>
        {tasks.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectsGroups}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <Bar dataKey="value">
                {projectsGroups.map((_, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={COLORSFORPROJECTS[index % COLORSFORPROJECTS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            No hay tareas aún
          </div>
        )}
      </div>
    </div>
  )
}
