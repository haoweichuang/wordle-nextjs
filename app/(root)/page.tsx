import Header from "../../components/Header";
import MainBoard from "../../components/MainBoard";
import BulletScreen from "../../components/BulletScreen";
import Conversation from "@/components/Conversation";
import Timer from "@/components/Timer";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <div className="w-full flex px-16">
          <BulletScreen />
        </div>
        <div className="lower-part grid grid-cols-3 gap-2">
          <div className="conversation flex">
            <Conversation />
          </div>
          <div className="game-mian max-w-3xl mx-auto px-4">
            <MainBoard />
          </div>
          <div className="timer flex">
            <Timer />
          </div>
        </div>
      </div>
    </div>
  );
}
