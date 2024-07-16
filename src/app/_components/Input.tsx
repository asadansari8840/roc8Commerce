'use client';
import React, {LegacyRef, forwardRef, useState} from 'react';
import {Control, Controller, FieldValues, Form, RegisterOptions} from 'react-hook-form';

type InputProps = {
    label?: string;
    rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    control?: Control<any>; // React Hook Form control object
    name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
const Input = forwardRef<InputProps, InputProps>(({type, rules, control, name, label, ...props}, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <div>
                    {label && <p className="my-2 capitalize">{label}</p>}
                    <div className="relative">
                        <input
                            className={`rounded-md border w-full p-2 ${type == 'password' && 'pr-12'}`}
                            placeholder="Enter "
                            ref={ref as LegacyRef<HTMLInputElement> | undefined}
                            {...props}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            type={type == 'password' && isPasswordVisible ? 'text' : type}
                        />
                        {type == 'password' && (
                            <span
                                className="absolute select-none top-[50%] right-3 translate-y-[-50%] cursor-pointer"
                                onClick={() => setIsPasswordVisible((prev) => !prev)}
                            >
                                {isPasswordVisible ? 'Hide' : 'Show'}
                            </span>
                        )}
                    </div>
                </div>
            )}
        />
    );
});

Input.displayName = 'Input';

export default Input;
