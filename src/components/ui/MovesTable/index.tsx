import { Box, Table, Text } from "@radix-ui/themes"

export const MovesTable: React.FC<{
    history: string[];
    currentMove: number;
    setCurrentMove: (n: number) => void;
}> = (props) => {
    const { history, setCurrentMove, currentMove } = props;
    return <Box className="max-h-100 overflow-y-auto border border-gray-300">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell className="text-xs">#</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    new Array(Math.ceil(history.length / 2)).fill(0).map((_, index) => {
                        const isWhiteActive = index * 2 + 1 === currentMove;
                        const isBlackActive = index * 2 + 2 === currentMove;

                        const activeClass = "rounded-sm bg-gray-200 ";
                        return <Table.Row key={index}>
                            <Table.RowHeaderCell className="text-xs">{index + 1}</Table.RowHeaderCell>
                            <Table.Cell className="text-xs">
                                <Text
                                    weight={isWhiteActive ? "bold" : "regular"}
                                    className={`cursor-pointer p-1 ${isWhiteActive ? activeClass : ""}`}
                                    onClick={() => setCurrentMove(index * 2 + 1)}
                                >
                                    {history[index * 2]}
                                </Text>
                            </Table.Cell>
                            <Table.Cell className="text-xs">
                                <Text
                                    weight={isBlackActive ? "bold" : "regular"}
                                    className={`cursor-pointer p-1 ${isBlackActive ? activeClass : ""}`}
                                    onClick={() => setCurrentMove(index * 2 + 2)}>
                                    {history[index * 2 + 1]}
                                </Text>
                            </Table.Cell>
                        </Table.Row>
                    })
                }
            </Table.Body>
        </Table.Root>
    </Box>
}