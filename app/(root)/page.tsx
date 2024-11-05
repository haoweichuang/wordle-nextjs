import Extend from "../../components/Extend";
import Header from "../../components/Header";
import MainBoard from "../../components/MainBoard";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4">
          <MainBoard />
          <Extend />
        </div>
      </div>
    </div>
  );
}
