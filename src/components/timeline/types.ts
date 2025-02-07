export type TimeUnit = "day" | "week" | "month" | "quarter" | "year" | "decade"

export interface Event {
  id: string
  name: string
  start_date: string
  end_date: string
  color: string
  type: string
  zone: number
  is_crayon?: boolean
}

