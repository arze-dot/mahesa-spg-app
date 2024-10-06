import CE_Header from "@/app/(private)/_element/CE_Header";
import React from "react";

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-screen ">
            <CE_Header />
            <>{children}</>
        </main>
    );
}