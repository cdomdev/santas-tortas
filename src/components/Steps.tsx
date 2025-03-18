import { useEffect, useState } from "react";
import { eventEmitter } from "@/events";

const Steps = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;

  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep) {
      setCurrentStep(Number(savedStep)); 
    }
    const handleStepChange = () => {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
    };

    if (eventEmitter) {
      eventEmitter.on("stepUpdate", handleStepChange);
    }

    return () => {
      if (eventEmitter) {
        eventEmitter.off("stepUpdate", handleStepChange);
      }
    };
  }, []);

  // Función para determinar clases dinámicas
  const getStepClasses = (step: number) => {
    if (step < currentStep) return "bg-gray-400 text-white";
    if (step === currentStep) return "bg-black text-white";
    return "bg-white text-primary-txt";
  };

  return (
    <section className="max-w-screen-xl mx-auto pt-28">
      <div className="w-[95%] md:w-full pb-5 max-w-screen-xl mx-auto">
        <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-primary-txt bg-[#f4ece3] border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
          {[...Array(totalSteps)].map((_, index) => {
            const step = index + 1;
            return (
              <li key={step} className="flex items-center w-1/3 justify-center">
                <span
                  className={`flex items-center justify-center size-7 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400 font-semibold ${getStepClasses(
                    step
                  )}`}
                >
                  {step}
                </span>
                <span className="hidden sm:inline-flex sm:ms-2">
                  {step === 1 && "Detalles del carrito"}
                  {step === 2 && "Datos de envío"}
                  {step === 3 && "Pago"}
                </span>
                {step < totalSteps && (
                  <svg
                    className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 12 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m7 9 4-4-4-4M1 9l4-4-4-4"
                    ></path>
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Steps;
