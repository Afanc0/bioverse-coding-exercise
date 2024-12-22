
import Button from "../button";

interface QuestionProp {
    sectionName: string;
    onClick: () => void;
}

const QuestionCard: React.FC<QuestionProp> = ({
    sectionName,
    onClick
}) => {

    const capitalizedSectionName = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);

    return (
        <div className="max-w-[425px] min-w-[375px] shadow flex-1 rounded-lg">
            <div>
                <img className="w-full h-[250px] object-cover rounded-t-lg" src="https://kaliforms.com/wp-content/uploads/2021/07/questionnaire-form.jpg" />
            </div>
            <div className="py-5 px-9 flex flex-col gap-2">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-custom-setup">{capitalizedSectionName}</h1>
                </div>
                <div>
                    <p className="text-custom-setup text-sm text-fourline text-gray-600">Click to begin and start answering the questions related to this section.</p>
                </div>
                <div className="mt-2 flex justify-center items-center">
                    <Button text="Begin" onClick={onClick} />
                </div>
            </div>
        </div>
    )

}

export default QuestionCard