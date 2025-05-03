import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

interface NavigationButtonsProps {
  step: number;
  formData: {
    subject: string;
    description: string;
    priceStarted: string;
    priceEnded: string;
    deadline: string;
  };
  skills: string[];
  prevStep: () => void;
  nextStep: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  step,
  formData,
  skills,
  prevStep,
  nextStep
}) => {
  const isNextDisabled = () => {
    return (
      (step === 1 && !formData.subject) ||
      (step === 2 && !formData.description) ||
      (step === 3 && skills.length === 0) ||
      (step === 5 && !(formData.priceStarted && formData.priceEnded)) ||
      (step === 6 && !formData.deadline)
    );
  };

  return (
    <div className="mt-8 flex flex-col md:flex-row gap-3">
      {step > 1 && (
        <button
          onClick={prevStep}
          className="md:w-1/3 py-3 px-6 bg-transparent border border-light-color5 dark:border-color5 text-light-color2 dark:text-color2 rounded-lg font-primaryMedium hover:bg-light-color5/10 dark:hover:bg-color5/10 transition-all duration-300"
        >
          بازگشت
        </button>
      )}
      <button
        onClick={nextStep}
        disabled={isNextDisabled()}
        className={`flex-1 py-3 px-6 bg-light-color8 dark:bg-color8 hover:bg-light-color9 dark:hover:bg-color9 text-light-color1 dark:text-color1 rounded-lg font-primaryBold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 ${
          isNextDisabled() ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
        }`}
      >
        ثبت <FaCheckCircle className="text-light-color5 dark:text-color5 text-xl" />
      </button>
    </div>
  );
};

export default NavigationButtons;