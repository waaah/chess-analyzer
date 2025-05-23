"use client";
import { Box, Button, Text, TextArea } from "@radix-ui/themes"
import { Chess } from "chess.js";
import { UploadIcon } from "lucide-react"
import { useRef } from "react";

export const PgnUploader: React.FC<{ loadPosition: (pgn: string) => void, }> = (props) => {
    const { loadPosition } = props;
    const pgnInputRef = useRef<HTMLTextAreaElement>(null);
    const uploadRef = useRef<HTMLInputElement>(null);

    const onFileUpload = (file: File) => {
        if (!file) return;

        const reader = new FileReader();

        /**
         * Handles the result of the FileReader, extracts the content of the
         * uploaded file, tries to parse it as a PGN string, and if successful,
         * updates the textarea with the content.
         * @param {ProgressEvent<FileReader>} event
         */
        reader.onload = function (event) {
            try {
                const chess = new Chess();
                chess.loadPgn(event?.target?.result as string);
                const content = event?.target?.result;
                pgnInputRef.current!.value = content as string;
            } catch (error) {
                console.error(error);
            }

        };

        reader.readAsText(file);

    };

    return <>
        <Box className="w-full mt-2">
            <Text size="2" weight={"bold"} >Upload/Paste PGN</Text>
            <TextArea rows={5} ref={pgnInputRef} resize="vertical" placeholder="Paste PGN" className="border-none mt-2" />
            <Button onClick={() => uploadRef.current?.click()} mt={"2"} mb="2" style={{ width: '100%', background: 'transparent', color: 'black', cursor: 'pointer', }} className="bg-transparent w-full  text-center">
                <UploadIcon width="18" height="18" /> Upload
            </Button>
        </Box>

        <input type="file" hidden ref={uploadRef} onChange={(e) => e.target.files && onFileUpload(e.target.files[0])} />
        <Box className="w-full mt-2">
            <Button onClick={() => loadPosition(pgnInputRef.current?.value || '')} style={{ width: '100%' }} className="w-full!important text-center">Add Game</Button>
        </Box>
    </>
}