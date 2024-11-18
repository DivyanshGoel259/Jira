import { ArrowRight } from "../../../assets/Icons";
import { Button } from "../../../components/ui/button";

interface ButtonProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const CallToAction = ({ props }: { props: ButtonProps }) => {
  return (
    <div className="py-14 flex justify-center flex-col">
      <div className="text-3xl font-bold  flex justify-center text-center ">
        {props.title}
      </div>
      <div className="text-xl pt-6 flex justify-center text-center ">
        {props.description}
      </div>
      <div className="mt-10 flex justify-center items-center">
        <Button className="animate-bounce" onClick={props.onClick}>
          {props.buttonText} <ArrowRight />{" "}
        </Button>
      </div>
    </div>
  );
};
