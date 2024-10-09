import React from "react";
// import CE_Header from "./_element/CE_Header";
import CE_ClientBottomBar from "./_element/navigation/CE_ClientBottomBar";

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-screen">
            <div className="h-screen bg-[#F6F7F9] overflow-y-scroll">
                {children}
            </div>
            <CE_ClientBottomBar />
        </main>
    );
}