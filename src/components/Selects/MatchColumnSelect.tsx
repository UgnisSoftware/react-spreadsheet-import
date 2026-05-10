import { useRSIContext } from "@/contexts/RSIContext"
import { SelectOption } from "@/types"
import { Combobox, useFilter, useListCollection } from "@chakra-ui/react"

interface Props {
  onChange: (value: SelectOption | null) => void
  value?: SelectOption
  options: SelectOption[]
  placeholder?: string
  name?: string
}

export const MatchColumnSelect = ({ onChange, value, options, placeholder, name }: Props) => {
  const { translations } = useRSIContext()
  const { contains } = useFilter({ sensitivity: "variant" })

  const { collection, filter } = useListCollection<SelectOption>({
    initialItems: options,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      value={value ? [value.value] : []}
      onValueChange={(e) => onChange(e.items[0])}
      openOnClick
      positioning={{ strategy: "fixed", hideWhenDetached: true }}
    >
      <Combobox.Control>
        <Combobox.Input placeholder={placeholder} aria-label={name} />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger data-testid="clear-trigger" />
          <Combobox.Trigger data-testid="trigger" />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>{translations.matchColumnsStep.noItemsFound}</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item item={item} key={item.value}>
              {item.label}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  )
}
