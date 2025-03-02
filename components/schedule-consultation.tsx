"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { scheduleConsultation } from "@/lib/actions"
import { useLanguage } from "@/lib/language-context"

export function ScheduleConsultation() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

  async function handleSchedule() {
    if (!date || !time) {
      toast.error("Please select both date and time")
      return
    }

    setIsSubmitting(true)
    try {
      await scheduleConsultation({ date, time })
      toast.success("Consultation scheduled!", {
        description: `Your consultation is scheduled for ${format(date, "PPP")} at ${time}.`,
      })
      setDate(undefined)
      setTime(undefined)
    } catch (error) {
      toast.error("Something went wrong.", {
        description: "We couldn't schedule your consultation. Please try again later.",
      })
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>{t("select-date")}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => {
                // Disable weekends and past dates
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                const day = date.getDay()
                return date < today || day === 0 || day === 6
              }}
            />
          </PopoverContent>
        </Popover>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className={cn(!time && "text-muted-foreground")}>
            <SelectValue placeholder={t("select-time")} />
          </SelectTrigger>
          <SelectContent>
            {availableTimes.map((timeSlot) => (
              <SelectItem key={timeSlot} value={timeSlot}>
                {timeSlot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleSchedule} disabled={isSubmitting}>
        {isSubmitting ? t("scheduling") : t("schedule")}
      </Button>
    </div>
  )
}

