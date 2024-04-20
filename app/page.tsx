"use client";

import UploadPage from "./pages/upload";
import React from "react";
import 'dotenv/config'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-36">
      <UploadPage />
    </main>
  );
}