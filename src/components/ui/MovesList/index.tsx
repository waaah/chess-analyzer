import { Flex, Text } from "@radix-ui/themes";

export const MovesList: React.FC<{
  history: string[];
  currentMove: number;
  setCurrentMove: (n: number) => void;
}> = (props) => {
  const { history, currentMove, setCurrentMove } = props;
  return (
    <Flex direction={"row"} gap={"2"} wrap={"wrap"}>
      {history.map((h, i) => {
        const isActive = i + 1 === currentMove;
        const weight = isActive ? "bold" : "regular";
        const activeClass = isActive ? "rounded-sm bg-gray-200  " : "";
        return (
          <Text
            className={`cursor-pointer px-2 text-sm ${activeClass}`}
            key={i}
            weight={weight}
            onClick={() => setCurrentMove(i + 1)}
          >
            {i + 1}. {h}
          </Text>
        );
      })}
    </Flex>
  );
};
