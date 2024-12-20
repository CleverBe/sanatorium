import { ChevronDown, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  ButtonHTMLAttributes,
  ComponentType,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react"

/**
 * Props for CustomSelect component
 */
interface CustomSelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string
    /** The unique value associated with the option. */
    value: string
    /** Optional icon component to display alongside the option. */
    icon?: ComponentType<{ className?: string }>
  }[]

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string) => void

  /** The default selected values when the component mounts. */
  defaultValue?: string

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string

  /**
   * If true, a search input will be displayed to filter options.
   * Optional, defaults to false.
   */
  showSearch?: boolean
}

export const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(
  (
    {
      options,
      onValueChange,
      defaultValue = "",
      placeholder = "Select options",
      className,
      showSearch = false,
      // ref,
      ...props
    },
    // ref,
  ) => {
    const [selectedValue, setSelectedValues] = useState<string>(defaultValue)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true)
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        setSelectedValues("")
        onValueChange("")
      }
    }

    const toggleOption = (option: string) => {
      const newValue = selectedValue === option ? "" : option
      setSelectedValues(newValue)
      onValueChange(newValue)
    }

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev)
    }

    const [triggerWidth, setTriggerWidth] = useState(0)
    const triggerRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth)
      }
    }, [triggerRef.current])

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={true}
      >
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            {...props}
            onClick={handleTogglePopover}
            variant="outline"
            className={cn(
              "flex h-9 w-full items-center justify-between truncate whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm hover:bg-transparent [&_svg]:pointer-events-auto",
              className,
            )}
          >
            {selectedValue ? (
              <span className="pointer-events-none">
                {options.find((o) => o.value === selectedValue)?.label}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          style={{ width: triggerWidth }}
        >
          <Command>
            {showSearch && (
              <CommandInput
                placeholder="Buscar..."
                onKeyDown={handleInputKeyDown}
              />
            )}
            <CommandList>
              <CommandEmpty>Sin resultados.</CommandEmpty>
              <CommandGroup className="max-h-[200px] overflow-y-auto">
                {options.map((option) => {
                  const isSelected = selectedValue === option.value

                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className="flex cursor-pointer items-center justify-between"
                    >
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                      {isSelected && <Check className="h-4 w-4" />}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)
