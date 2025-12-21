import { Card } from "@/components/ui/card";

import DeliveryIcon from "@/assets/delivery.png";
import FoodIcon from "@/assets/food-service.png";
import RetailIcon from "@/assets/retail.png";
import EventsIcon from "@/assets/events.png";
import TutoringIcon from "@/assets/tutoring.png";
import TechIcon from "@/assets/tech.png";

const categories = [
  { icon: DeliveryIcon, title: "Delivery & Logistics", jobs: 234 },
  { icon: FoodIcon, title: "Food Service", jobs: 189 },
  { icon: RetailIcon, title: "Retail", jobs: 156 },
  { icon: EventsIcon, title: "Events", jobs: 98 },
  { icon: TutoringIcon, title: "Tutoring", jobs: 145 },
  { icon: TechIcon, title: "Tech Support", jobs: 87 },
];

const BrowseByCategorySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary dark:text-primary">
            Browse by{" "}
            <span className="text-primary dark:text-yellow-400">Category</span>
          </h2>
          <p className="mt-4 text-lg text-secondary/70 dark:text-primary/70">
            Thousands of jobs across popular categories
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.title}
              className="p-6 flex items-center gap-4 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div>
                <img
                  src={category.icon}
                  alt={category.title}
                  className="h-7 w-7"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-secondary dark:text-primary hover:text-yellow-400">
                  {category.title}
                </h3>
                <p className="text-sm text-secondary/70 dark:text-primary/70">
                  {category.jobs} Jobs
                </p>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BrowseByCategorySection;
