import { ColumnDef } from "@tanstack/react-table";
import { IndeterminateCheckbox } from "./checkbox";

export type Customer = {
    "id": number;
    "first_name": string;
    "last_name": string;
    "email": string;
    "gender": string;
    "ip_address": string;
}

export const columns: ColumnDef<Customer>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <IndeterminateCheckbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({ row }) => (
            <div className="px-1">
                <IndeterminateCheckbox
                    {...{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            </div>
        ),
    },
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "first_name",
        header: "First Name"
    },
    {
        accessorKey: "last_name",
        header: "Last Name"
    },
    {
        accessorKey: "gender",
        header: "Gender"
    },
    {
        accessorKey: "ip_address",
        header: "IP Address"
    },
    {
        accessorKey: "email",
        header: "Email address"
    },
    {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => {
            return row.getCanExpand() ? (
                <button {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' }
                }}>
                    {row.getIsExpanded() ? "⬆️" : "⬇️"}
                </button>
            ) : (
                "🐠"
            )
        }
    }
]
