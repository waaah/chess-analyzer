'use client'
import { Button, Heading, Select, Text, TextField } from "@radix-ui/themes";
import { User } from "lucide-react";
import { useRef, useState } from "react";

const LoginPage = () => {
    const userNameRef = useRef<HTMLInputElement>(null);
    const sourceRef = useRef<HTMLInputElement>(null);
    const inputSize = "3"
    const [stage, setStage] = useState(0)
    return <div className="h-screen flex gap-2 items-center justify-center">
        <div className="w-200 text-center">
            <Heading mb="5" size="9">♟️Checkly</Heading>
            <Text mb="2" className="text-center mt-3 mb-3" size={inputSize}> Unlock smarter, faster chess insights.
                Analyze your games, spot your blunders, and level up — one move at a time.</Text>
            {/* <Heading mb="2" className="text-center" size="5xl">♟️ Checkly</Heading>
            <Text mb="10" className="text-center" fontSize="sm" color="fg.muted"</Text> */}

            {
                stage == 0 && <>
                    <TextField.Root className="mt-5 mb-5" size={inputSize} placeholder="Enter your username">
                        <TextField.Slot>
                            <User height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                    <Button size={inputSize} onClick={() => setStage(1)}>Proceed</Button>
                    {/* <Field.Root>
                        <Field.Label>From where do you play?</Field.Label>
                        <Input ref={sourceRef} mb={inputSize} className="shadow-md" placeholder="User Name" size="lg" />
                        <Button >Proceed</Button>
                    </Field.Root> */}
                </>
            }
            {
                stage == 1 &&
                <>
                    <div className="my-5">
                        <Select.Root size={inputSize}>
                            <Select.Trigger style={{ width: "100%" }} className="mt-5 mb-5" placeholder="From where do you play?" />
                            <Select.Content style={{ width: "100%" }}>
                                <Select.Group>
                                    <Select.Item value="chess.com">Chess.com</Select.Item>
                                    <Select.Item value="lichess">Lichess</Select.Item>
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </div>
                    <div className="flex gap-2 mt-5 items-center justify-center">
                        <Button size={inputSize} onClick={() => setStage(0)}>Back</Button>
                        <Button size={inputSize} onClick={() => alert('success')}>Proceed</Button>
                    </div>


                </>
            }
        </div>
    </div >;
}

export default LoginPage;