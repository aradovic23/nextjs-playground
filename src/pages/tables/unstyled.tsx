import { DataTable } from "@/components/ui/unstyled-table";
import data from '@/data/MOCK_DATA_TABLE.json'
import { columns } from '@/components/ui/columns'
import { renderSubComponent } from "@/components/renderSubComponent";

function Unstyled() {
  return (
    <main className="grid h-screen place-items-center">
      <DataTable data={data} columns={columns} getRowCanExpand={() => true} renderSubComponent={renderSubComponent} />
    </main>

  )
}

export default Unstyled
