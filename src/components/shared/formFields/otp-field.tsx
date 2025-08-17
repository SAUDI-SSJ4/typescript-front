import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import type { Control, FieldErrors } from "react-hook-form";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Routes } from "@/constants/enums";

interface OtpFieldProps {
  name: string;
  label?: string;
  disabled?: boolean;
  errors: FieldErrors;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  numInputs?: number;
  autoFocus?: boolean;
}

// Simple OTP Input Component
const SimpleOtpInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  numInputs: number;
  autoFocus: boolean;
  disabled: boolean;
  hasError?: boolean;
}> = ({ value, onChange, numInputs, autoFocus, disabled, hasError }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, newValue: string) => {
    // Only allow digits
    newValue = newValue.replace(/\D/g, "");
    if (newValue.length > 1) {
      newValue = newValue.slice(-1);
    }

    const newOtp = value.split("");
    newOtp[index] = newValue;
    const updatedOtp = newOtp.join("");

    onChange(updatedOtp);

    // Move to next input if value is entered
    if (newValue && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    const otpArr = value.split("");
    for (let i = 0; i < numInputs; i++) {
      otpArr[i] = pasted[i] || otpArr[i] || "";
    }
    onChange(otpArr.join(""));
    // Focus the last filled input
    const lastIdx = Math.min(pasted.length, numInputs) - 1;
    if (lastIdx >= 0) {
      inputRefs.current[lastIdx]?.focus();
    }
  };
  return (
    <div className="flex gap-2 justify-center" dir="ltr">
      {Array.from({ length: numInputs }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          className={`w-12 h-12 text-center border-2 rounded-lg focus:outline-none text-lg font-semibold ${
            hasError
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
        />
      ))}
    </div>
  );
};

const OtpField: React.FC<OtpFieldProps> = ({
  name,
  label,
  disabled = false,
  errors,
  control,
  numInputs = 6,
  autoFocus = false,
}) => {
  const searchParams = useSearchParams();
  const { email: verifiedEmail } = Object.fromEntries(searchParams[0]);
  const { verifyAccount } = useAuth();
  const error = errors[name];
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-4">
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <SimpleOtpInput
            value={value || ""}
            onChange={async (otp: string) => {
              onChange(otp);

              // Only send request when all inputs are filled with valid numbers
              if (otp.length === numInputs && /^\d+$/.test(otp)) {
                try {
                  const { message } = await verifyAccount({
                    email: verifiedEmail,
                    otp,
                  });
                  if (message) {
                    toast.success(message);
                    navigate(`/${Routes.DASHBOARD}`, {
                      replace: true,
                    });
                  }
                } catch (error) {
                  console.error("OTP verification failed:", error);
                }
              }
            }}
            numInputs={numInputs}
            autoFocus={autoFocus}
            disabled={disabled}
            hasError={!!error}
          />
        )}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message as string}</p>
      )}
    </div>
  );
};

export default OtpField;
