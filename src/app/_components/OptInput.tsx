import React, {useRef} from 'react';
import {Controller, FieldValues, RegisterOptions, UseFormGetValues, UseFormSetValue, useForm} from 'react-hook-form';

type InputProps = {
    label?: string;
    rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control?: any; // React Hook Form control object
    name: string;
    setValue: UseFormSetValue<any>;
    otpLength?: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

const OtpInput: React.FC<InputProps> = ({control, otpLength = 8, setValue, ...props}) => {
    const [otpValues, setOtpValues] = React.useState(Array(otpLength).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(8).fill(null));

    const onChange = (index: number, value: string) => {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);
        setValue(props.name, newOtpValues);

        if (value && index < 7) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && otpValues[index] === '') {
            // Focus the previous input if current is empty and backspace is pressed
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            // Move focus to the previous input field when pressing left arrow key
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 7) {
            // Move focus to the next input field when pressing right arrow key
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <div>
            {props.label && <p className="my-3 ml-2">{props.label}</p>}
            <div className="flex gap-2 items-center justify-center">
                {otpValues.map((value, index) => (
                    <Controller
                        {...props}
                        key={index}
                        name={`otp[${index}]`}
                        control={control}
                        defaultValue=""
                        render={({field, fieldState: {error}}) => (
                            <>
                                <input
                                    {...field}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ref={(el: any) => (inputRefs.current[index] = el)}
                                    type="number"
                                    maxLength={1}
                                    value={value}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        if (/^\d$/.test(newValue) || newValue === '') {
                                            onChange(index, newValue);
                                        }
                                    }}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="size-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {error?.root?.message && (
                                    <p>{error.root.message}</p>
                                )}
                            </>
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

OtpInput.displayName = 'OtpInput';

export default OtpInput;
