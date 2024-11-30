'use client';
import { redirect } from "next/navigation"
import AllSeeingEyeModel from "./components/AllSeeingEyeModel";
import AllSeeingEye from "./components/models/AllSeeingEye.jsx";
export default function Home() {

  return (
    <main>
      <div className="w-full h-screen">
        <AllSeeingEyeModel>
          <AllSeeingEye />
        </AllSeeingEyeModel>
      </div>
    </main>
  );
}
