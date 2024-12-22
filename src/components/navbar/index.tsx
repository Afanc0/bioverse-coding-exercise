import { useRouter } from "next/navigation"
import { BioverseLogo } from "../bioverse-logo"



const NavBar = () => {

    const router = useRouter()
    
    const navigateToLogin = () => {
        localStorage.removeItem("user")
        router.push('/');
    }

    return (

        <div className="py-8 px-8 border-b-2 flex flex-row justify-between">
            <div className="flex-1">
                <BioverseLogo width="250"/>
            </div>
            <div className="flex-1 flex justify-end">
                <button className="bg-[#286ba2] rounded-full py-3 px-8 hover:bg-[#3b8fd6]" onClick={navigateToLogin}>
                    <span className="text-white text-base font-semibold">Sign Out</span>
                </button>
            </div>
        </div>
    )
}

export default NavBar