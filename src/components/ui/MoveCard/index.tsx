'use client'
import { Box, Card, Flex } from "@radix-ui/themes";

export const MoveCard: React.FC<{ children: React.ReactNode }> = (props) => {
    const { children } = props;
    return <Card className="shadow-md w-full" style={{ padding: "0" }}>
        <Flex direction={"column"} align="center">
            {/* <Box className="w-full">
                <div className="p-4 flex gap-2 w-20 text-xs flex-col items-center justify-center text-center">
                    <span className="icon-blitz">
                        <svg viewBox="0 0 32 32" height="28.75" width="28.75" aria-hidden="true" data-glyph="game-time-blitz" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="M9.833 19H15.4l3.2-11.567C18.9 6.4 18.6 6 17.5 6h-5.667c-1.1 0-1.566.4-1.733 1.467L8.567 17.533C8.4 18.6 8.733 19 9.833 19m12.934-6h-8.1L12.4 27.3c-.233 1.633.2 1.833 1.167.467L23.4 14.2c.633-.867.467-1.2-.633-1.2"></path></svg>
                    </span>
                    <span>Blitz</span>
                </div>

            </Box>
            <Box className="w-full text-sm border-t border-gray-300 max-h-[480px] overflow-y-scroll">
                <MovesTable />
            </Box> */}
            <Box className="w-full p-5">
                {children}
            </Box>
        </Flex>
    </Card >;
}