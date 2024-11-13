import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "../../../assets/Icons";
import { Button } from "../../../components/ui/button"

export const HeroSection = ({ title }: { title: string }) => {
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate("/onboarding")
    }
    return (
        <div className="flex justify-center items-center flex-col text-center px-4 py-8">
            <div>
                <h1 className="bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    {title} with
                </h1>
                <h2 className="flex justify-center  bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    <img src="src/assets/logo2.png" alt="zcrum" className="h-16 w-34 mt-4" />
                </h2>
                <h3 className="pt-2 text-gray-300 md:text-xl">
                    Empower your team with our intuitive project management solution
                </h3>
                <div className="flex justify-center gap-4 pt-8">
                    <div>
                    <Button onClick={handleClick}>Get Started <ChevronRightIcon/></Button>
                    </div>
                    <div>
                    <Button variant={"outline"}>Learn More</Button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
