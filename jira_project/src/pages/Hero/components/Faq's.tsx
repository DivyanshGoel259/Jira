import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../components/ui/accordion"
import { Faqs } from "../../../data/constants"

interface items{
    question: string,
    answer: string,
 
}
export const HeroFaqs = ({title,items}:{title:string,items:items[]}) => {
    return <div className=" pt-16 bg-[#101825]">
        <div className="flex justify-center text-center text-3xl font-bold ">
            {title}
        </div>
        <div className="pt-4 w-full py-10">
            <Accordion type="multiple" className="p-6">
                {items.map((faq,index) => {
                    return <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                           {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                })}
            </Accordion>

        </div>
    </div>
}