import { waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

export async function selectCombobox(combobox: HTMLElement, optionLabel: string) {
  await userEvent.click(combobox)

  const option = await waitFor(() => {
    const listboxId = combobox.getAttribute("aria-controls")
    if (!listboxId) {
      throw new Error("Combobox does not have aria-controls attribute")
    }
    const listbox = document.getElementById(listboxId)
    if (!listbox) {
      throw new Error(`Listbox with id ${listboxId} not found`)
    }

    expect(listbox).toHaveAttribute("data-state", "open")

    return within(listbox).getByText(optionLabel)
  })

  await userEvent.click(option)

  await waitFor(
    () => {
      expect(option).toHaveAttribute("data-state", "checked")
    },
    {
      timeout: 5000,
    },
  )
}
