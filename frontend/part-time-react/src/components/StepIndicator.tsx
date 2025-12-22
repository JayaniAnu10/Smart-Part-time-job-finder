import React from "react";

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [1, 2];

  return (
    <div className="flex items-center justify-center gap-0 my-6 w-full max-w-md mx-auto">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={
              "w-[40px] h-[40px] flex items-center justify-center rounded-full border-2 text-[16px] z-10 " +
              (currentStep >= step
                ? "bg-[#F7C01D] border-[#F7C01D] text-[#0F1F3D]"
                : "bg-[#E0E7F5] border-[#E0E7F5] text-[#364D7D]")
            }
          >
            {step}
          </div>

          {index !== steps.length - 1 && (
            <div
              className={
                "w-12 h-[4px]  " +
                (currentStep > step ? "bg-[#F7C01D]" : "bg-[#E0E7F5]")
              }
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
