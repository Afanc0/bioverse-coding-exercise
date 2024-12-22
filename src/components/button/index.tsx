
interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick
}) => {
    return (
        <button className="bg-[#286ba2] flex-1 rounded-full py-4 hover:bg-[#3b8fd6]" onClick={onClick}>
            <span className="text-white text-base font-semibold">{text}</span>
        </button>
    )
}

export default Button