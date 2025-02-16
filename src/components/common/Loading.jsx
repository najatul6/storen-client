import Lottie from "lottie-react";
import loadingImg from "../../assets/Animations/blue hand loading.json";

const Loading = () => {
  return (
    <div className="w-full mx-auto min-h-screen flex justify-center items-center">
      <Lottie animationData={loadingImg} />
    </div>
  );
};

export default Loading;
