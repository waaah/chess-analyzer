import { Flex, Box, Text } from "@radix-ui/themes"
export const GameItem = () => {
    const winIcon = <span className="text-green-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="4" ry="4" stroke="transparent" fill="currentColor" />
            <line x1="5" y1="12" x2="19" y2="12" stroke="white" />
            <line x1="12" y1="5" x2="12" y2="19" stroke="white" />
        </svg>
    </span>
    const loseIcon = <span className="text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="4" ry="4" stroke="currentColor" fill="currentColor" />
            <line x1="5" y1="12" x2="19" y2="12" stroke="white" />
        </svg>
    </span>

    return <Flex gap="3" align="center" className="border-b border-gray-300 hover:bg-gray-100 px-4 py-1">
        <Flex gap="2" align={"center"}>
            <span className="icon-blitz">
                <svg fill="currentColor" viewBox="0 0 32 32" height="28.75" width="28.75" aria-hidden="true" data-glyph="game-time-blitz" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="M9.833 19H15.4l3.2-11.567C18.9 6.4 18.6 6 17.5 6h-5.667c-1.1 0-1.566.4-1.733 1.467L8.567 17.533C8.4 18.6 8.733 19 9.833 19m12.934-6h-8.1L12.4 27.3c-.233 1.633.2 1.833 1.167.467L23.4 14.2c.633-.867.467-1.2-.633-1.2"></path></svg>
            </span>
            <Text size="3" weight={"bold"}>3+2</Text>
        </Flex>

        <Box className="cursor-pointer w-full p-4">
            <Flex align={"center"}>
                <Flex gap={"3"} align={"center"}>
                    {winIcon}
                    <Text size="2" weight="bold">
                        Teodros Girmay
                    </Text>
                    <Text size="1" color="gray">
                        1107
                    </Text>
                </Flex>
                <Box className="ml-auto">
                    <Text size="2" >
                        90%
                    </Text>
                </Box>
            </Flex>

            <Flex align={"center"}>
                <Flex gap={"3"} align={"center"}>
                    {loseIcon}
                    <Text size="2" weight="bold">
                        Teodros Girmay
                    </Text>
                    <Text size="1" color="gray">
                        1107
                    </Text>
                </Flex>
                <Box className="ml-auto">
                    <Text size="2" >
                        90%
                    </Text>
                </Box>
            </Flex>
        </Box>
    </Flex>
}