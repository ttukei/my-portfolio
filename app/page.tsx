'use client';
import { redirect } from "next/navigation"

export default function Home() {

  redirect("/coming-soon/index.html");

  return (
    <main>
      <div className="w-full h-screen">
        <h1>under construction</h1>
      </div>
    </main>
  );
}
