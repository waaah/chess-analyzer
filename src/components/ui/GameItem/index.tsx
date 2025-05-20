import { BlitzIcon } from "@/components/icons/BlitzIcon";
import { BulletIcon } from "@/components/icons/BulletIcon";
import { RapidIcon } from "@/components/icons/RapidIcon";
import { ResultIcon } from "@/components/icons/ResultIcon";
import { GameModes } from "@/types/chess";
import { ChessGame } from "@/types/chess-user";
import { Flex, Box, Text } from "@radix-ui/themes";

export const GameItem: React.FC<{ gameItem: ChessGame }> = (props) => {
  const { gameItem } = props;

  const getGameIcon = (gameMode: GameModes) => {
    console.log(gameMode, "GameModes");
    if (gameMode === GameModes.BLITZ) return <BlitzIcon />;
    if (gameMode === GameModes.RAPID) return <RapidIcon />;
    if (gameMode === GameModes.BULLET) return <BulletIcon />;
  };

  return (
    <Flex
      gap="3"
      align="center"
      className="border-b border-gray-300 hover:bg-gray-100 px-4 py-1"
    >
      <Flex gap="2" align={"center"}>
        <Text size="3" weight={"bold"}>
          {gameItem.time_control}
        </Text>
        {getGameIcon(gameItem.time_class)}
      </Flex>

      <Box className="cursor-pointer w-full p-4">
        <Flex align={"center"}>
          <Flex gap={"3"} align={"center"}>
            <ResultIcon result={gameItem.white.result} />
            <Text size="2" weight="bold">
              {gameItem.white.username}
            </Text>
            <Text size="1" color="gray">
              {gameItem.white.rating}
            </Text>
          </Flex>
          <Box className="ml-auto">
            <Text size="2">{gameItem.white.accuracy}%</Text>
          </Box>
        </Flex>

        <Flex align={"center"}>
          <Flex gap={"3"} align={"center"}>
            <ResultIcon result={gameItem.black.result} />
            <Text size="2" weight="bold">
              {gameItem.black.username}
            </Text>
            <Text size="1" color="gray">
              {gameItem.black.rating}
            </Text>
          </Flex>
          <Box className="ml-auto">
            <Text size="2">{gameItem.black.accuracy}%</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
