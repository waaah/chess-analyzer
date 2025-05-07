import { Table } from "@radix-ui/themes"

export const MovesTable = () => {
    return <Table.Root>
        <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell className="text-xs">#</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {
                new Array(50).fill(0).map((_, index) => {
                    return <Table.Row key={index}>
                        <Table.RowHeaderCell className="text-xs">{index + 1}</Table.RowHeaderCell>
                        <Table.Cell className="text-xs">d4</Table.Cell>
                        <Table.Cell className="text-xs">d5</Table.Cell>
                    </Table.Row>
                })
            }
        </Table.Body>
    </Table.Root>
}