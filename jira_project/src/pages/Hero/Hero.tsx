
import { useNavigate } from "react-router-dom"
import { Footer } from "../../components/Footer"
import { companies, Faqs, features } from "../../data/constants"
import { CallToAction } from "./components/CallToAction"
import { HeroCarousel } from "./components/Carousel"
import { HeroFaqs } from "./components/Faq's"
import { HeroSection } from "./components/HeroSection"
import { KeyFeatures } from "./components/KeyFeatures"
import { checkUser } from "../auth/CheckUser"


export const Hero = () => {
    checkUser()
    const navigate = useNavigate()
   const CallToActionProps = {
        title:"Ready to Transform Your Workflow",
        buttonText:"Start For Free",
        description:"Join thousands of teams already using ZCRUM to streamline their projects and boost their productivity",
        onClick:()=>{
            navigate("/onboarding")
        }
    }
    return (<>
        <main className="pt-24 min-h-screen">
            <section>
                <HeroSection title={"Streamline your workflow"} />
            </section>
            <section className="pt-12 pb-12">
                <KeyFeatures features={features}/>
            </section>
            <section>
                <HeroCarousel title="Trusted By Industry Leaders" items={companies}/>
            </section>
            <section className="py-8">
                <HeroFaqs title="Frequently Asked Questions" items={Faqs}/>
            </section>
            <section>
                <CallToAction props={CallToActionProps} />
            </section>
        </main>

        <footer className="py-12 bg-gray-900"><Footer /></footer>
    </>)
}