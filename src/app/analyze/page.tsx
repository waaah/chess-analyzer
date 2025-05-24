"use client";
import { AnalysisChessboard } from "@/components/ui/AnalysisChessboard";
import { EvalBar } from "@/components/ui/EvaluationBar";
import { GameUser } from "@/components/ui/GameUser";
import { MoveButtons } from "@/components/ui/MoveButtons";
import { MoveCard } from "@/components/ui/MoveCard";
import { MovesList } from "@/components/ui/MovesList";
import { PgnUploader } from "@/components/ui/PgnUploader";
import { PlayTimer } from "@/components/ui/PlayTimer";
import { useChess } from "@/hooks/useChess";
import { PlayerColor } from "@/types/chess";
import { Box, Flex, Grid } from "@radix-ui/themes";

const AnalyzePage = () => {
  const {
    loadPosition,
    gameInstance,
    moves: {
      currentMove,
      history,
      moveBack,
      moveNext,
      moveToEnd,
      moveToStart,
      setCurrentMove,
    },
  } = useChess();
  return (
    <Grid
      className="m-auto w-fit"
      columns={{ initial: "1", md: "600px 500px" }}
      gap="5"
    >
      <Box className="p-3">
        <Flex direction={"row"}>
          <div>
            <Flex
              direction={"row"}
              className="mt-2 align-center items-center gap-2 mb-2"
            >
              <GameUser></GameUser>
              <PlayTimer className="ml-auto" color={PlayerColor.WHITE} />
            </Flex>
            <Flex gap="2">
              <EvalBar />
              <AnalysisChessboard game={gameInstance} />
            </Flex>
            <Flex
              direction={"row"}
              className="mt-2 align-center items-center gap-2"
            >
              <GameUser></GameUser>
              <PlayTimer className="ml-auto" color={PlayerColor.BLACK} />
            </Flex>
          </div>
        </Flex>
      </Box>
      <Box className="mt-10">
        <MoveCard>
          {history.length > 0 ? (
            <>
              <MovesList
                history={history}
                currentMove={currentMove}
                setCurrentMove={setCurrentMove}
              />
              <MoveButtons
                moveBack={moveBack}
                moveForward={moveNext}
                moveToEnd={moveToEnd}
                moveToStart={moveToStart}
              />
            </>
          ) : (
            <>
              <PgnUploader loadPosition={loadPosition} />
            </>
          )}
        </MoveCard>
      </Box>
    </Grid>
  );
};

export default AnalyzePage;
