import { UploadFlow } from "../components/UploadFlow"

export default {
  title: "Input",
  parameters: {
    component: UploadFlow,
  },
  args: {
    label: "Label",
  },
  argTypes: {
    disabled: {
      table: { disable: false },
      control: {
        type: "boolean",
      },
    },
  },
}

export const Basic = () => <UploadFlow />
