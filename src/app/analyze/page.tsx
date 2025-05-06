'use client'
import { BasicChessboard } from "@/components/ui/BasicChessboard"
import { EvalBar } from "@/components/ui/EvaluationBar"
import { GameUser } from "@/components/ui/GameUser"
import { MoveCard } from "@/components/ui/MoveCard"
import { PlayTimer } from "@/components/ui/PlayTimer"
import { PlayerColor } from "@/types/chess"
import { Box, Flex, Grid } from "@radix-ui/themes"

const AnalyzePage = () => {
    return <Grid className="m-auto w-fit" columns={{ initial: "1", md: "600px 500px" }} gap="5">
        <Box className="p-3">
            <Flex direction={"row"}>
                <div>
                    <Flex direction={"row"} className="mt-2 align-center items-center gap-2 mb-2">
                        <GameUser></GameUser>
                        <PlayTimer className="ml-auto" color={PlayerColor.WHITE} />
                    </Flex>
                    <Flex gap="2">
                        <EvalBar blackEval={0.5} whiteEval={0.5} />
                        <BasicChessboard />
                    </Flex>
                    <Flex direction={"row"} className="mt-2 align-center items-center gap-2">
                        <GameUser></GameUser>
                        <PlayTimer className="ml-auto" color={PlayerColor.BLACK} />
                    </Flex>
                </div>

            </Flex>

        </Box>
        <Box className="mt-10">
            <MoveCard />
        </Box>
    </Grid>


}

export default AnalyzePage