import React, { forwardRef, useState, isValidElement } from "react";
import classNames from "classnames";
import { uniqueId } from "lodash";

export default function Textarea({
    className,
    id,
    label,
    labelClassName,
    subLabel,
    fieldClassName,
    prefixLabel,
    prefixClassName,
    suffixLabel,
    suffixClassName,
    error,
    required,
    guide,
    ...props
}) {
    const [htmlId] = useState(id || uniqueId("in_"));

    return (
        <TextareaWrapper
            className={className}
            label={label}
            labelClassName={labelClassName}
            subLabel={subLabel}
            labelFor={htmlId}
            error={error}
            required={required}
            guide={guide}
        >
            {prefixLabel}
            <textarea
                id={htmlId}
                className={classNames(
                    "peer bg-slate-50 px-4 py-3 outline-none border border-slate-200 focus:border-violet-500 font-medium w-full placeholder:text-neutral-400 placeholder:font-normal",
                    {
                        "border-b-red-500 focus:border-b-primary": error,
                        "rounded-r-md": !suffixLabel,
                        "rounded-l-md": !prefixLabel,
                    },
                    fieldClassName
                )}
                {...props}
            />
            {suffixLabel && (
                <div
                    className={classNames(
                        "bg-neutral-200 border-y-2 border-neutral-200 peer-focus:border-b-primary border-l-0 border-b-neutral-400 rounded-r-md shrink-0",
                        {
                            "border-b-red-500 focus:border-b-primary": error,
                        },
                        suffixClassName
                    )}
                >
                    {suffixLabel}
                </div>
            )}
        </TextareaWrapper>
    );
}

const LabelText = forwardRef(({ text, children, subLabel = false, className }, ref) => {
    return (
        <span
            className={classNames(
                " font-medium",
                {
                    "text-slate-600 text-sm": !subLabel,
                    "text-slate-500 text-xs": subLabel,
                },
                className
            )}
            ref={ref}
        >
            {text || children}
        </span>
    );
});

export const TextareaWrapper = forwardRef(
    ({ children, className, labelFor, label, labelClassName, subLabel, error, guide, required }, ref) => {
        return (
            <div className={classNames("flex flex-col", className)} ref={ref}>
                {label && (
                    <label className="flex gap-y-1 mb-1" htmlFor={labelFor}>
                        {isValidElement(label) ? (
                            label
                        ) : (
                            <LabelText className={labelClassName} subLabel={subLabel}>
                                {label}
                            </LabelText>
                        )}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                {children}
                {guide && <div className="w-full text-xs text-slate-500 mt-1 italic">{guide}</div>}
                {error && <span className="text-red-600 text-2xs text-right mt-1">{error}</span>}
            </div>
        );
    }
);
