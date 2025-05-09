'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const TanStackQueryProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
}