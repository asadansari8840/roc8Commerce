'use client';
import React, {forwardRef, useState} from 'react';
import {Controller} from 'react-hook-form';
import type {LegacyRef} from 'react';
import type {RegisterOptions, FieldValues} from 'react-hook-form';

type InputProps = {
    label?: string;
    rules?: Omit<RegisterOptions<FieldValues, string>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control?: any; // React Hook Form control object
    name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
const Input = forwardRef<InputProps, InputProps>(({type, rules, control, name, label, ...props}, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <Controller
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            control={control}
            name={name}
            rules={rules}
            render={({field: {value, onChange, onBlur}}) => (
                <div>
                    {label && <p className="my-2 capitalize">{label}</p>}
                    <div className="relative">
                        <input
                            className={`rounded-md border w-full p-2 ${type == 'password' && 'pr-12'}`}
                            placeholder="Enter "
                            ref={ref as LegacyRef<HTMLInputElement> | undefined}
                            {...props}
                            value={value as string}
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
