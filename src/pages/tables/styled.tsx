import { StyledTable } from "@/components/ui/styled-table"
import data from '@/data/MOCK_DATA_TABLE.json'
import { columns } from "@/components/ui/columns"
import { renderSubComponent } from "@/components/renderSubComponent"

function Styled() {
  return (
    <main className="grid h-screen place-items-center">
      <StyledTable data={data} columns={columns} getRowCanExpand={() => true} renderSubComponent={renderSubComponent} />
    </main>
  )
}

export default Styled
