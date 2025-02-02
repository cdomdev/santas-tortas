import { eventEmitter } from "@/events";

type PropsBtn = {
  className: String;
  enlace: String;
  text: String;
  step: string;
};

export const ButtonNexSteps = ({ className, enlace, text, step }: PropsBtn) => {
  const nextPage = () => {
    localStorage.setItem("currentStep", `${step}`);
    if (eventEmitter) {
      eventEmitter.emit("stepUpdate");
    }
    window.location.href = `${enlace}`;
  };

  return (
    <button onClick={nextPage} className={`${className}`}>
      {text}
    </button>
  );
};
