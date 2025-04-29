import { Button, FileUpload } from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"

export const UploadPgnButton = () => {

    return <FileUpload.Root>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
            <Button variant="outline" size="sm">
                <HiUpload /> Upload PGN
            </Button>
        </FileUpload.Trigger>
        <FileUpload.List />
    </FileUpload.Root>

}