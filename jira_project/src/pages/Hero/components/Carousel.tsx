import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface items {
  name: string;
  path: string;
  id: number;
}
export const HeroCarousel = ({
  title,
  items,
}: {
  title: string;
  items: items[];
}) => {
  return (
    <div className="flex justify-center flex-col">
      <div className="text-3xl font-bold flex justify-center text-center">
        {title}
      </div>
      <div className="pt-4">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className=" w-full py-10"
        >
          <CarouselContent className="flex items-center pt-2 gap-5 sm:gap-20">
            {items.map((company) => {
              return (
                <CarouselItem
                  key={company.id}
                  className="basis-1/3 lg:basis-1/6"
                >
                  <img
                    src={company.path}
                    alt={company.name}
                    width={200}
                    height={56}
                    className="h-9 sm:h-14 w-auto object-contain"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};
