import React from "react";


interface FormInput {
    question: string;
    onChange: (arg: any) => void;
    value: string;
}

const FormInput: React.FC<FormInput> = ({
    question,
    onChange,
    value
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value)
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="mb-2 text-lg">
                <span className="text-[#286ba2] font-bold">Required: </span>
                {question}
            </label>
            <textarea
                className="border-2 resize-none border-gray-400 p-[10px] text-lg rounded-md flex-1 focus:border-[#3b8fd6]"
                rows={4}
                placeholder="Enter your text here"
                onChange={handleChange}
                value={value}
            />
        </div>
    )
}

interface FormRadio {
    question: string;
    options: string[];
    value: string | string[] | null;
    onChange: (arg: any) => void;
}

const FormRadio: React.FC<FormRadio> = ({
    question,
    options,
    value,
    onChange
}) => {
    const isMutlipleSelect = question.includes("Select all")
    const [selectedOptions, setSelectedOptions] = React.useState<string[] | string | null>(
        value || (isMutlipleSelect ? [] : null)
    )

    React.useEffect(() => {
        setSelectedOptions(value || (isMutlipleSelect ? [] : null))
    }, [value, isMutlipleSelect])

    const handleSelect = (option: string) => {
        let newSelectedOptions: string[] | string | null

        if (isMutlipleSelect) {
            newSelectedOptions = Array.isArray(selectedOptions)
                ? selectedOptions.includes(option)
                    ? selectedOptions.filter((item) => item !== option)
                    : [...selectedOptions, option]
                : [option]
        } else {
            newSelectedOptions = option
        }

        setSelectedOptions(newSelectedOptions)
        onChange(newSelectedOptions)
    }

    return (
        <div className="flex flex-col gap-4">
            <label className="mb-2 text-lg">
                <span className="text-[#286ba2] font-bold">Required: </span>
                {question}
            </label>
            {options.map((option, index) => (
                <div key={index} className="flex items-center mb-3">
                    <input
                        type={isMutlipleSelect ? "checkbox" : "radio"}
                        id={option}
                        name="custom-radio"
                        value={option}
                        onChange={() => handleSelect(option)}
                        checked={
                            isMutlipleSelect
                                ? Array.isArray(selectedOptions) && selectedOptions.includes(option)
                                : selectedOptions === option
                        }
                        className="hidden peer"
                    />
                    <label
                        htmlFor={option}
                        className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-2 cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500`}
                    >
                        <span
                        className={`w-3 h-3 rounded-full bg-white peer-checked:bg-white`}
                        ></span>
                    </label>
                    <span>{option}</span>
                </div>
            ))}
        </div>
    )
}

export { FormInput, FormRadio }