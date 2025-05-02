import { Box, Button, Card, Flex, Table } from "@radix-ui/themes";
import { Play, ChevronRight, ChevronsLeft, ChevronsRight, ChevronLeft, } from "lucide-react";

export const MoveCard = () => {
    return <Card className="shadow-md w-full" style={{ padding: "0" }}>
        <Flex direction={"column"} align="center">
            <Box className="h-10 w-full">
                <ChevronLeft />
            </Box>
            <Box className="w-full border-t border-gray-300">
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.RowHeaderCell>1</Table.RowHeaderCell>
                            <Table.Cell>d4</Table.Cell>
                            <Table.Cell>d5</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Box>
            <Box className="w-full p-4">
                <Flex gap={'3'} align={'center'} justify={'center'}>
                    <Button><ChevronsLeft /></Button>
                    <Button><ChevronLeft /></Button>
                    <Button><Play /></Button>
                    <Button><ChevronRight /></Button>
                    <Button><ChevronsRight /></Button>
                </Flex>

            </Box>
        </Flex>
    </Card >;
}