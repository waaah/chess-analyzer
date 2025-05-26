import { MoveTree } from "@/hooks/useChess";
import { Box, Table, Text } from "@radix-ui/themes";
import { MovesList } from "../MovesList";

export const MovesTable: React.FC<{
  moveTree: MoveTree[];
  currentMove: number;
  selectCurrentMove: (n: number) => void;
}> = (props) => {
  const { moveTree, selectCurrentMove, currentMove } = props;
  return (
    <Box className="max-h-100 overflow-y-auto border border-gray-300">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="text-xs">
              #
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {new Array(Math.ceil(moveTree.length / 2)).fill(0).map((_, index) => {
            const isWhiteActive = index * 2 + 1 === currentMove;
            const isBlackActive = index * 2 + 2 === currentMove;
            const activeClass = "rounded-sm bg-gray-200 ";
            const whiteMoves = moveTree[index * 2];
            const blackMoves = moveTree[index * 2 + 1];

            return (
              <Table.Row key={index}>
                <Table.RowHeaderCell className="text-xs">
                  {index + 1}
                </Table.RowHeaderCell>
                <Table.Cell className="text-xs">
                  <Text
                    weight={isWhiteActive ? "bold" : "regular"}
                    className={`cursor-pointer p-1 ${
                      isWhiteActive ? activeClass : ""
                    }`}
                    onClick={() => selectCurrentMove(index * 2 + 1)}
                  >
                    {moveTree[index * 2].square}
                  </Text>
                </Table.Cell>
                <Table.Cell className="text-xs">
                  {blackMoves ? (
                    <Text
                      weight={isBlackActive ? "bold" : "regular"}
                      className={`cursor-pointer p-1 ${
                        isBlackActive ? activeClass : ""
                      }`}
                      onClick={() => selectCurrentMove(index * 2 + 2)}
                    >
                      {moveTree[index * 2 + 1].square}
                    </Text>
                  ) : (
                    <></>
                  )}
                  {moveTree[index * 2].alternates.length > 0 ? (
                    <MovesList movesTree={whiteMoves.alternates} />
                  ) : (
                    <></>
                  )}
                  {blackMoves && blackMoves.alternates.length > 0 ? (
                    <MovesList movesTree={blackMoves.alternates} />
                  ) : (
                    <></>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
