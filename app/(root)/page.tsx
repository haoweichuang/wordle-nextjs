import Extend from "@/compents/Extend";
import Header from "@/compents/Header";
import MainBoard from "@/compents/MainBoard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="App">
      <Header />
      <MainBoard />
      <Extend />
    </div>
  );
}
