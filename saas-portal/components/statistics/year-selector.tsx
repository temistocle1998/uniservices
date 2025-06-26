"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const academicYears = [
  { value: "all", label: "Toutes les années" },
  { value: "2023-2024", label: "2023-2024" },
  { value: "2022-2023", label: "2022-2023" },
  { value: "2021-2022", label: "2021-2022" },
  { value: "2020-2021", label: "2020-2021" },
  { value: "2019-2020", label: "2019-2020" },
]

interface YearSelectorProps {
  onYearChange: (year: string) => void
  className?: string
  multiple?: boolean
}

export function YearSelector({ onYearChange, className, multiple = false }: YearSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedYears, setSelectedYears] = useState<string[]>(["2023-2024"])

  const handleSelect = (currentValue: string) => {
    let newSelectedYears: string[]

    if (multiple) {
      // Si "Toutes les années" est sélectionné, on désélectionne tout le reste
      if (currentValue === "all") {
        newSelectedYears = ["all"]
      }
      // Si on sélectionne une année spécifique et que "Toutes les années" était sélectionné
      else if (selectedYears.includes("all")) {
        newSelectedYears = [currentValue]
      }
      // Gestion normale de la sélection multiple
      else {
        if (selectedYears.includes(currentValue)) {
          // Ne pas permettre de désélectionner la dernière année
          if (selectedYears.length > 1) {
            newSelectedYears = selectedYears.filter((year) => year !== currentValue)
          } else {
            newSelectedYears = selectedYears
          }
        } else {
          newSelectedYears = [...selectedYears, currentValue]
        }
      }
    } else {
      // Mode sélection unique
      newSelectedYears = [currentValue]
    }

    setSelectedYears(newSelectedYears)
    onYearChange(newSelectedYears.join(","))
  }

  const displayValue = multiple
    ? selectedYears.map((year) => academicYears.find((y) => y.value === year)?.label).join(", ")
    : academicYears.find((year) => year.value === selectedYears[0])?.label

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {displayValue || "Sélectionner une année"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Rechercher une année..." />
          <CommandList>
            <CommandEmpty>Aucune année trouvée.</CommandEmpty>
            <CommandGroup>
              {academicYears.map((year) => (
                <CommandItem
                  key={year.value}
                  value={year.value}
                  onSelect={() => {
                    handleSelect(year.value)
                    if (!multiple) setOpen(false)
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedYears.includes(year.value) ? "opacity-100" : "opacity-0")}
                  />
                  {year.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
