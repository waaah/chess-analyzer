export const formatApiResponse = async (response: Response) => {
    const json = await response.json();
    if (response.ok) {
        return json;
    } else {
        const error = json as { message: string, code: string };
        throw new Error(error.message);
    }
}