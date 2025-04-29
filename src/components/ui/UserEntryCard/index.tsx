import { Card, Button, Input } from "@chakra-ui/react"

export const UserEntryCard = () => {
    return <Card.Root className="shadow-md">
        <Card.Body gap="2" >
            <Card.Title mt="2">Please enter your username to get your Chess Games</Card.Title>
            <Card.Description>


            </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">

        </Card.Footer>
    </Card.Root>
}