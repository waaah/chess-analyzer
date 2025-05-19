'use client'
import { LoginService } from "@/services/login";
import { ChessGameSource } from "@/types/chess";
import { TextField, Button, Select, Heading, Text, Box, AlertDialog } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const inputSize = "3"
  const [stage, setStage] = useState(0)
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const loginMutation = useMutation({
    mutationFn: LoginService.loginUser,
    onError: () => setOpen(true),
  })

  const form = useForm({
    defaultValues: {
      username: '',
      source: ChessGameSource.CHESS_COM,
    },
    onSubmit: async (e) => {
      if (!e.formApi.state.isValid) return;
      // Do something with form data
      try {
        await loginMutation.mutateAsync({ username: e.value.username, source: e.value.source })
        router.push('/games')
      } catch (error: unknown) {
        console.error(error)
      }

    },
  })

  return <div className="h-screen flex gap-2 items-center justify-center">
    <div className="w-200 text-center">
      <form onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit(e)
      }}>
        <Heading mb="5" size="9">♟️Checkly</Heading>
        <Text mb="2" className="text-center mt-3 mb-3" size={inputSize}> Unlock smarter, faster chess insights.
          Analyze your games, spot your blunders, and level up — one move at a time.</Text>
        {

          stage == 0 &&
          <form.Field
            name="username"
            validators={{
              onChange: ({ value }) =>
                value.length === 0 && 'Username must be provided',
              onBlur: ({ value }) =>
                value.length === 0 && 'Username must be provided'
            }}>
            {
              (field) => (
                <>
                  <Box className="mt-5 mb-5">
                    <TextField.Root
                      disabled={loginMutation.isPending}
                      size={inputSize}
                      color={`${!field.state.meta.isValid && field.state.meta.isTouched ? 'red' : 'gray'}`}
                      placeholder="Your username"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    >
                      <TextField.Slot>
                        <User height="16" width="16" />
                      </TextField.Slot>
                    </TextField.Root>
                    {
                      field.state.meta.isTouched && field.state.meta.errors?.length > 0 &&
                      <Box className="justify-self-start">
                        <Text className="text-red-500 ">{field.state.meta.errors[0]}</Text>
                      </Box>
                    }
                  </Box>

                  <Button size={inputSize} onClick={async () => {
                    await form.validateField('username', 'submit');
                    const hasError = field.state.meta.errors?.length > 0;
                    const isValid = field.state.meta.isValid
                    if (isValid && !hasError) setStage(1)
                    return;
                  }}>Proceed</Button>
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
                      disabled={loginMutation.isPending}
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
                    <Button disabled={loginMutation.isPending} size={inputSize} onClick={() => setStage(0)}>Back</Button>
                    <Button disabled={loginMutation.isPending} type="submit" size={inputSize}>Proceed</Button>
                  </div>
                </>
              )}
          </form.Field>

        }
      </form>

      <AlertDialog.Root open={open} onOpenChange={() => setOpen(false)}>
        <AlertDialog.Content maxWidth="500px">
          <AlertDialog.Title size="5">Login Failed</AlertDialog.Title>
          <AlertDialog.Description size="3" mb={"5"} mt={"5"}>
            {loginMutation.error?.message}
          </AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button variant="soft" color="red">
              Close
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>


    </div>

  </div >;
}
