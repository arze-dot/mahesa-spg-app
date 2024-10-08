import React from "react";
import { FormProvider } from "@/lib/context/MultiFormContext";
import CE_Header from "./_element/CE_Header";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-screen">
            <CE_Header />
            <FormProvider>
                {children}
            </FormProvider>
        </main>
    );
}