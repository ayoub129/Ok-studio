"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TimeSlotPickerProps {
  selectedTime: string | null
  onTimeSelect: (time: string) => void
  bookedTimes?: string[]
}

export function TimeSlotPicker({ selectedTime, onTimeSelect, bookedTimes = [] }: TimeSlotPickerProps) {
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Select Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {timeSlots.map((time) => {
            const isBooked = bookedTimes.includes(time)
            const isSelected = selectedTime === time

            return (
              <Button
                key={time}
                variant={isSelected ? "default" : "outline"}
                onClick={() => onTimeSelect(time)}
                disabled={isBooked}
                className={cn(
                  "transition-all duration-200",
                  isSelected && "bg-foreground text-background hover:bg-foreground/90",
                  !isSelected && !isBooked && "hover:scale-105",
                )}
              >
                {time}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
