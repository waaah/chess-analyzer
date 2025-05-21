import { Box, Button, IconButton, Text, TextArea } from "@radix-ui/themes"
import { UploadIcon } from "lucide-react"

export const PgnUploader = () => {
    return <>
        <Text size="2" weight={"bold"} >Upload/Paste PGN</Text>
        <TextArea resize="vertical" placeholder="Paste PGN" className="border-none mt-2" />
        <Button mt={"2"} mb="2" style={{ width: '100%', background: 'transparent', color: 'black', cursor: 'pointer', }} className="bg-transparent w-full  text-center">
            <UploadIcon width="18" height="18" /> Upload
        </Button>
        <Box className="w-full mt-2">
            <Button style={{ width: '100%' }} className="w-full!important text-center">Add Game</Button>
        </Box>
    </>
}