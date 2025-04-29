'use client'
import { Button, Field, Heading, Input, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

const LoginPage = () => {
    const userNameRef = useRef<HTMLInputElement>(null);
    const sourceRef = useRef<HTMLInputElement>(null);
    const [stage, setStage] = useState(0)
    return <div className="h-screen flex items-center justify-center">
        <div className="w-200 ">
            <Heading mb="2" className="text-center" size="5xl">♟️ Checkly</Heading>
            <Text mb="10" className="text-center" fontSize="sm" color="fg.muted">Unlock smarter, faster chess insights.
                Analyze your games, spot your blunders, and level up — one move at a time.</Text>

            {
                stage == 0 && <>
                    <Field.Root>
                        <Field.Label>From where do you play?</Field.Label>
                        <Input ref={sourceRef} mb="3" className="shadow-md" placeholder="User Name" size="lg" />
                        <Button onClick={() => setStage(1)}>Proceed</Button>
                    </Field.Root>
                </>
            }
            {
                stage == 1 &&
                <>
                    <Field.Root>
                        <Field.Label>Enter your username</Field.Label>
                        <Input ref={userNameRef} mb="3" className="shadow-md" placeholder="User Name" size="lg" />
                    </Field.Root>
                    <Button mr="2" onClick={() => setStage(0)}>Back</Button>
                    <Button onClick={() => alert('success')}>Proceed</Button>
                </>

            }


        </div >
    </div>;
}

export default LoginPage;