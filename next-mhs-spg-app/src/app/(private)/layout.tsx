import React from "react";
// import CE_Header from "./_element/CE_Header";
import CE_ClientBottomBar from "./_element/navigation/CE_ClientBottomBar";

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-screen ">
            {/* <CE_Header /> */}
            <div className="min-h-screen bg-[#F6F7F9] h-[1000px] overflow-y-scroll pb-20">
                {children}
            </div>
            <CE_ClientBottomBar />
        </main>
    );
}