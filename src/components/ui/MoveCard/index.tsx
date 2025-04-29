import { Card, Table } from "@chakra-ui/react"

export const MoveCard = () => {
    return <Card.Root className="shadow-md">
        <Card.Header borderBottom={'2px solid #e4e4e7'} paddingBottom={5}>Game</Card.Header>
        <Card.Body style={{ padding: 0 }}>
            <Table.Root size="sm" showColumnBorder>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>#</Table.ColumnHeader>
                        <Table.ColumnHeader></Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row >
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>d4</Table.Cell>
                        <Table.Cell>d5</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </Card.Body>
        <Card.Footer paddingBottom={5} height={10} />
    </Card.Root>
}