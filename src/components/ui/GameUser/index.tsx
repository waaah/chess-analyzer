import { Flex, Box } from "@radix-ui/themes"
import { User } from "lucide-react"

export const GameUser = () => {
    return <Flex direction={"row"} className="mt-2 align-center items-center gap-2">
        <Box className="bg-gray-300 p-3 ">
            <User />
        </Box>
        <Flex direction={"column"} className="align-center">
            <span className="text-sm">Magnus Carlsen</span>
            <span className="font-bold text-xs">1107</span>
        </Flex>

    </Flex>

}