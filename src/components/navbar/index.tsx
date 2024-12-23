import { useRouter } from "next/navigation"
import { BioverseLogo } from "../bioverse-logo"



const NavBar = () => {

    const router = useRouter()
    
    const navigateToLogin = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("level")
        router.push('/');
    }

    return (
        <div className="py-8 px-8 border-b-2 flex flex-row justify-between">
            <div className="flex-1">
                <BioverseLogo width="250" height="50"/>
            </div>
            <div className="flex-1 flex justify-end items-center">
                <button className="bg-[#286ba2] rounded-full py-3 px-8 hover:bg-[#3b8fd6] low-res-disappear" onClick={navigateToLogin}>
                    <span className="text-white text-base font-semibold">Sign Out</span>
                </button>
                <button className="hidden low-res-appear bg-[#286ba2] rounded-full p-3 justify-center items-center hover:bg-[#1f5785] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#286ba2]" onClick={navigateToLogin}>
                    <svg 
                        width="25px" 
                        height="25px" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg" 
                        aria-hidden="true"
                    >
                        <path 
                            d="M16 17L21 12M21 12L16 7M21 12H9M12 17C12 17.93 12 18.395 11.8978 18.7765C11.6204 19.8117 10.8117 20.6204 9.77646 20.8978C9.39496 21 8.92997 21 8 21H7.5C6.10218 21 5.40326 21 4.85195 20.7716C4.11687 20.4672 3.53284 19.8831 3.22836 19.1481C3 18.5967 3 17.8978 3 16.5V7.5C3 6.10217 3 5.40326 3.22836 4.85195C3.53284 4.11687 4.11687 3.53284 4.85195 3.22836C5.40326 3 6.10218 3 7.5 3H8C8.92997 3 9.39496 3 9.77646 3.10222C10.8117 3.37962 11.6204 4.18827 11.8978 5.22354C12 5.60504 12 6.07003 12 7" 
                            stroke="white" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default NavBar