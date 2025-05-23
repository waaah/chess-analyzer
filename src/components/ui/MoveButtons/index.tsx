'use client'
import { Flex, Button, Box } from "@radix-ui/themes";
import { ChevronsLeft, ChevronLeft, Play, ChevronRight, ChevronsRight } from "lucide-react";


export const MoveButtons: React.FC<{
    moveBack: () => void,
    moveForward: () => void,
    moveToStart: () => void,
    moveToEnd: () => void
}> = (props) => {
    const { moveBack, moveForward, moveToStart, moveToEnd } = props;

    return <Box className="w-full p-4 bg-white">
        <Flex gap={'3'} align={'center'} justify={'center'}>
            <Button onClick={moveToStart}><ChevronsLeft /></Button>
            <Button onClick={moveBack}><ChevronLeft /></Button>
            <Button><Play /></Button>
            <Button onClick={moveForward}><ChevronRight /></Button>
            <Button onClick={moveToEnd}><ChevronsRight /></Button>
        </Flex>
    </Box>
}