'use client'
import { Button, Grid, GridItem, Input } from "@chakra-ui/react"
import { UploadPgnButton } from "@/components/ui/UploadPgnButton"
import { BasicChessboard } from "@/components/ui/BasicChessboard"
import { MoveCard } from "@/components/ui/MoveCard"
import { UserEntryCard } from "@/components/ui/UserEntryCard"

const AnalyzePage = () => {
    return <Grid padding={8} style={{ height: "100vh", maxHeight: "100vh" }} templateColumns="repeat(4, 1fr)" gap="6">

        <GridItem colSpan={2}>
            <BasicChessboard />
        </GridItem>

        <GridItem colSpan={2}>
            <MoveCard />
        </GridItem>
    </Grid>
}

export default AnalyzePage