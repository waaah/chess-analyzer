'use client'
import { BasicChessboard } from "@/components/ui/BasicChessboard"
import { EvalBar } from "@/components/ui/EvaluationBar"
import { MoveCard } from "@/components/ui/MoveCard"
import { PlayTimer } from "@/components/ui/PlayTimer"
import { PlayerColor } from "@/types/chess"
import { Box, Flex, Grid } from "@radix-ui/themes"

const AnalyzePage = () => {
    return <Grid columns={{ initial: "1", md: "600px 1fr" }} gap="3" width="auto">
        <Box className="p-3">
            <Flex direction={"row"}>
                <EvalBar blackEval={0.5} whiteEval={0.5} />
                <div>
                    <PlayTimer className="mb-2 mt-2" color={PlayerColor.WHITE} />
                    <BasicChessboard />
                    <PlayTimer color={PlayerColor.BLACK} className="ml-auto mt-2" />
                </div>

            </Flex>

        </Box>
        <Box className="mt-10 p-3">
            <MoveCard />
        </Box>
    </Grid>

}

export default AnalyzePage