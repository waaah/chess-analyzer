import { GameItem } from "@/components/ui/GameItem";
import { Pagination } from "@/components/ui/Pagination";
import { Box, Heading } from "@radix-ui/themes";
import Image from 'next/image'

const GamesPage = () => {
    return <div className="mx-30 my-10">

        <div className="border border-gray-300">
            <Box className="p-3 m-4">
                <Heading size={"6"}>Recent Games</Heading>
            </Box>
            <Box>
                <GameItem></GameItem>
                <GameItem></GameItem>
                <GameItem></GameItem>
                <GameItem></GameItem>
                <GameItem></GameItem>
            </Box>

            <Box className="p-3 m-4">
                <Pagination></Pagination>
            </Box>
        </div>
    </div>
}

export default GamesPage;