import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newValue = [...value]
      newValue[index] = parseInt(e.target.value)
      onValueChange(newValue)
    }

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full items-center", className)}
        {...props}
      >
        <div className="relative w-full">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-blue-600 rounded-full"
              style={{
                marginLeft: `${((value[0] - min) / (max - min)) * 100}%`,
                width: `${((value[1] - value[0]) / (max - min)) * 100}%`
              }}
            />
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => handleChange(e, 0)}
            className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) => handleChange(e, 1)}
            className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
