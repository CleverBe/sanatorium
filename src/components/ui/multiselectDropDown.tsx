import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { ChevronDown, XCircle } from "lucide-react"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface ISelectProps {
  value: string[]
  onChange: (value: string[]) => void
  options: { label: string; value: string }[]
  placeholder: string
}

const MultiselectDropDown = ({
  value,
  options,
  onChange,
  placeholder,
}: ISelectProps) => {
  const selectedOptions = options.filter((item) => value.includes(item.value))

  const isOptionSelected = (value: string): boolean => {
    return Boolean(selectedOptions.find((option) => option.value === value))
  }

  const handleUnselect = (item: string) => {
    onChange(value.filter((i) => i !== item))
  }
  const [open, setOpen] = useState(false)

  const [triggerWidth, setTriggerWidth] = useState(0)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [triggerRef.current])

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          className={cn(
            `flex w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm hover:bg-transparent [&_svg]:pointer-events-auto`,
            selectedOptions.length > 1 ? "h-full" : "h-9",
          )}
        >
          {selectedOptions.length === 0 && (
            <span className="truncate text-sm text-muted-foreground">
              {placeholder}
            </span>
          )}
          <div className="flex flex-wrap gap-1">
            {selectedOptions.slice(0, 3).map((item) => (
              <Badge variant="secondary" key={item.value}>
                {item.label}
                <XCircle
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation()
                    handleUnselect(item.value)
                  }}
                />
              </Badge>
            ))}
            {selectedOptions.length > 3 && (
              <Badge
                variant="secondary"
                className="border bg-primary/10"
              >{`+ ${selectedOptions.length - 3} mas`}</Badge>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{ width: triggerWidth }}
        className="max-h-96 overflow-auto"
      >
        {options.map((option) => {
          return (
            <DropdownMenuCheckboxItem
              onSelect={(e) => e.preventDefault()}
              key={option.value}
              checked={isOptionSelected(option.value)}
              onCheckedChange={() =>
                onChange(
                  value.includes(option.value)
                    ? value.filter((item) => item !== option.value)
                    : [...value, option.value],
                )
              }
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { MultiselectDropDown }
