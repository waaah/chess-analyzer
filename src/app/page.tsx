'use client'
import { loginUser } from "@/services/login";
import { ChessGameSource } from "@/types/chess";
import { TextField, Button, Select, Heading, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { User } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const inputSize = "3"
  const [stage, setStage] = useState(0)

  const loginMutation = useMutation({
    mutationFn: loginUser,
  })

  const form = useForm({
    defaultValues: {
      username: '',
      source: ChessGameSource.CHESS_COM,
    },
    onSubmit: async (e) => {
      console.log(e.value)
      // Do something with form data
      loginMutation.mutate({ username: e.value.username, source: e.value.source })
    },
  })



  return <div className="h-screen flex gap-2 items-center justify-center">
    <div className="w-200 text-center">
      <form onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}>
        <Heading mb="5" size="9">♟️Checkly</Heading>
        <Text mb="2" className="text-center mt-3 mb-3" size={inputSize}> Unlock smarter, faster chess insights.
          Analyze your games, spot your blunders, and level up — one move at a time.</Text>
        {

          stage == 0 &&
          <form.Field
            name="username">
            {
              (field) => (
                <>
                  <TextField.Root
                    className="mt-5 mb-5"
                    size={inputSize}
                    placeholder="Enter your username"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <TextField.Slot>
                      <User height="16" width="16" />
                    </TextField.Slot>
                  </TextField.Root>
                  <Button size={inputSize} onClick={() => setStage(1)}>Proceed</Button>
                </>
              )
            }
          </form.Field>
        }
        {
          stage == 1 &&
          <form.Field
            name="source">
            {
              (field) => (
                <>
                  <div className="my-5">
                    <Select.Root size={inputSize}
                      value={field.state.value}
                      onValueChange={(value) => { field.handleChange(value as ChessGameSource) }}
                    >
                      <Select.Trigger style={{ width: "100%" }} className="mt-5 mb-5" placeholder="From where do you play?" />
                      <Select.Content style={{ width: "100%" }}>
                        <Select.Group>
                          <Select.Item value={ChessGameSource.CHESS_COM}>Chess.com</Select.Item>
                          <Select.Item value={ChessGameSource.LICHESS}>Lichess</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </div>
                  <div className="flex gap-2 mt-5 items-center justify-center">
                    <Button size={inputSize} onClick={() => setStage(0)}>Back</Button>
                    <Button type="submit" onClick={form.handleSubmit} size={inputSize}>Proceed</Button>
                  </div>
                </>
              )}
          </form.Field>

        }
      </form>



    </div>

  </div >;
}
