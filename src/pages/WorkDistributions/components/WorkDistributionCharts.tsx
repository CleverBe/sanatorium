import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/helpers/dates"
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
  total: number
}

const CustomTooltip = ({ active, payload, total }: CustomTooltipProps) => {
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

export const WorkDistributionCharts = ({ tasks }: { tasks: Task[] }) => {
  const COLORSFORPROJECTS = [
    "#0088fe",
    "#00c49f",
    "#ffbb28",
    "#ff8042",
    "#063970",
    "#76b5c5",
    "#f53b57",
    "#9bc53d",
    "#795548",
    "#607d8b",
  ]

  const uniqueProjects = Array.from(
    new Set(tasks.map((task) => task.project.id)),
  ).map((id) => ({
    id,
    name: tasks.find((task) => task.project.id === id)!.project.name,
    startDate: tasks.find((task) => task.project.id === id)!.project.startDate,
    endDate: tasks.find((task) => task.project.id === id)!.project.endDate,
  }))

  const projectsGroups = uniqueProjects.map((project) => {
    const taskByProject = tasks.filter((task) => task.project.id === project.id)

    const totalHours = taskByProject.reduce(
      (acc, task) => acc + task.estimatedHours,
      0,
    )

    return {
      name:
        project.name.length > 11
          ? `${project.name.slice(0, 9)}..`
          : project.name.slice(0, 11),
      value: totalHours,
    }
  })

  const total = projectsGroups.reduce((acc, p) => acc + p.value, 0)

  const projectsGroupsWithPercentage = uniqueProjects.map((project) => {
    const taskByProject = tasks.filter((task) => task.project.id === project.id)

    const totalHours = taskByProject.reduce(
      (acc, task) => acc + task.estimatedHours,
      0,
    )

    return {
      id: project.id,
      name: project.name,
      hours: totalHours,
      percentage: `${((totalHours / total) * 100).toFixed(2)} %`,
      period: `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`,
    }
  })

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="grid w-full max-w-[1200px] grid-cols-1 place-items-center gap-4 xl:grid-cols-2">
        {/* PIE CHART */}
        <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-md border p-4 md:w-[480px]">
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
                <Tooltip content={<CustomTooltip total={total} />} />
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
        <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-md border p-4 md:w-[480px]">
          <h1 className="text-lg">Distribución de horas por proyecto</h1>
          {tasks.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectsGroups}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
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
      <Table className="mx-auto mt-9 w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead>Proyecto</TableHead>
            <TableHead>Horas estimadas</TableHead>
            <TableHead>Periodo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectsGroupsWithPercentage.map((project) => (
            <TableRow key={project.id} className="border-b border-slate-300">
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.percentage}</TableCell>
              <TableCell>{project.period}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>100 %</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
