import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface StudentAttendanceStatsProps {
  stats: {
    total: number
    present: number
    absent: number
    excused: number
    late: number
    attendanceRate: number
  }
}

export default function StudentAttendanceStats({ stats }: StudentAttendanceStatsProps) {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Taux de présence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
          <Progress value={stats.attendanceRate} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {stats.present} présences sur {stats.total} sessions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Absences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.absent}</div>
          <p className="text-xs text-muted-foreground mt-2">
            {stats.absent > 0 ? `${((stats.absent / stats.total) * 100).toFixed(1)}% des sessions` : "Aucune absence"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Absences excusées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.excused}</div>
          <p className="text-xs text-muted-foreground mt-2">
            {stats.excused > 0
              ? `${((stats.excused / stats.total) * 100).toFixed(1)}% des sessions`
              : "Aucune absence excusée"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Retards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.late}</div>
          <p className="text-xs text-muted-foreground mt-2">
            {stats.late > 0 ? `${((stats.late / stats.total) * 100).toFixed(1)}% des sessions` : "Aucun retard"}
          </p>
        </CardContent>
      </Card>
    </>
  )
}
