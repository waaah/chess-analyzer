'use client'
import { Button, Heading, Select, Text, TextField } from "@radix-ui/themes";
import { User } from "lucide-react";
import { useRef, useState } from "react";

const LoginPage = () => {
    const userNameRef = useRef<HTMLInputElement>(null);
    const sourceRef = useRef<HTMLInputElement>(null);
    const [stage, setStage] = useState(0)
    return <div className="h-screen flex gap-2 items-center justify-center">
        <div className="w-200 text-center">
            <Heading mb="2" size="7">♟️ Checkly</Heading>
            <Text mb="2" className="text-center mb-2" size="2"> Unlock smarter, faster chess insights.
                Analyze your games, spot your blunders, and level up — one move at a time.</Text>
            {/* <Heading mb="2" className="text-center" size="5xl">♟️ Checkly</Heading>
            <Text mb="10" className="text-center" fontSize="sm" color="fg.muted"</Text> */}

            {
                stage == 0 && <>
                    <TextField.Root className="mb-2" placeholder="Enter your username">
                        <TextField.Slot>
                            <User height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                    <Button onClick={() => setStage(1)}>Proceed</Button>
                    {/* <Field.Root>
                        <Field.Label>From where do you play?</Field.Label>
                        <Input ref={sourceRef} mb="3" className="shadow-md" placeholder="User Name" size="lg" />
                        <Button >Proceed</Button>
                    </Field.Root> */}
                </>
            }
            {
                stage == 1 &&
                <>
                    <div className="my-2">
                        <Select.Root >
                            <Select.Trigger style={{ width: "100%" }} className="mb-2" placeholder="From where do you play?" />
                            <Select.Content style={{ width: "100%" }}>
                                <Select.Group>
                                    <Select.Item value="chess.com">Chess.com</Select.Item>
                                    <Select.Item value="lichess">Lichess</Select.Item>
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        <Button className="m-2" onClick={() => setStage(0)}>Back</Button>
                        <Button className="m-2" onClick={() => alert('success')}>Proceed</Button>
                    </div>


                </>
            }
        </div>
    </div >;
}

export default LoginPage;