import { Card } from "@/components/ui/card";
import useCategory from "@/hooks/useCategory";
import DeliveryIcon from "@/assets/delivery.png";
import FoodIcon from "@/assets/food-service.png";
import RetailIcon from "@/assets/retail.png";
import EventsIcon from "@/assets/events.png";
import TutoringIcon from "@/assets/tutoring.png";
import CleaningIcon from "@/assets/cleaning.png";
import DataEntryIcon from "@/assets/dataentry.png";
import OtherIcon from "@/assets/other.png";
import TechIcon from "@/assets/tech.png";

const categoryIcons: Record<string, string> = {
  "delivery & logistics": DeliveryIcon,
  "food service": FoodIcon,
  retail: RetailIcon,
  "events & promotion": EventsIcon,
  "tutoring & education": TutoringIcon,
  "tech support": TechIcon,
  "data entry": DataEntryIcon,
  "cleaning & maintenance": CleaningIcon,
  other: OtherIcon,
};

const BrowseByCategorySection = () => {
  const { data: categories, isLoading } = useCategory();

  // Use default icon if specific icon not found
  const getIcon = (categoryName: string) => {
    return categoryIcons[categoryName] || DeliveryIcon;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-lg text-secondary/70 dark:text-primary/70">
              Loading categories...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary dark:text-primary">
            Browse by{" "}
            <span className="text-primary dark:text-yellow-400">Category</span>
          </h2>
          <p className="mt-4 text-lg text-secondary/70 dark:text-primary/70">
            Explore opportunities across popular categories
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <Card
              key={category.id}
              className="p-6 flex items-center gap-4 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div>
                <img
                  src={getIcon(category.category)}
                  alt={category.category}
                  className="h-7 w-7"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-secondary dark:text-primary hover:text-yellow-400">
                  {category.category}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategorySection;
