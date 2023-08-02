import { Row } from "@tanstack/react-table"
import { Customer } from "./ui/columns"

export const renderSubComponent = ({ row }: { row: Row<Customer> }) => {
  return (
    <pre style={{ fontSize: '10px' }}>
      <code>{JSON.stringify(row.original, null, 2)}</code>
    </pre>
  )
}
