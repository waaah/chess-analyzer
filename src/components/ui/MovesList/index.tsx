import { MoveTree } from "@/hooks/useChess";
import { Flex, Text } from "@radix-ui/themes";

export const MovesList: React.FC<{
  movesTree: MoveTree[];
}> = (props) => {
  const { movesTree } = props;
  return (
    <Flex className="text-xs" direction={"row"} gap={"2"} wrap={"wrap"}>
      {movesTree.map((m, i) => {
        const isActive = i + 1;
        const weight = isActive ? "bold" : "regular";
        const activeClass = isActive ? "rounded-sm bg-gray-200  " : "";
        return (
          <Text
            className={`cursor-pointer px-2 text-sm ${activeClass}`}
            key={i}
            weight={weight}
          >
            {i + 1}. {m.square}
          </Text>
        );
      })}
    </Flex>
  );
};
