import { SelectOption } from "@/types"
import { createListCollection, Portal, Select } from "@chakra-ui/react"
import { useMemo } from "react"

interface Props {
  onChange: (value: SelectOption | null) => void
  value?: SelectOption
  options: SelectOption[]
}

export const TableSelect = (props: Props) => {
  const { onChange, value, options } = props

  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
      }),
    [options],
  )

  return (
    <Select.Root
      size="sm"
      collection={collection}
      value={value ? [value.value] : []}
      onValueChange={(e) => onChange(e.items[0] || null)}
      open
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger p={0} border="none">
          <Select.ValueText placeholder=" " />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner css={{ zIndex: "popover !important" }}>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
