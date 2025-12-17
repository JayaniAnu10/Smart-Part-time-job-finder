import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import MapIcon from "@/assets/map-icon.svg";
import LightningIcon from "@/assets/instant.svg";
import ShieldIcon from "@/assets/shield.svg";
import ClockIcon from "@/assets/clock.svg";

const features = [
  {
    icon: MapIcon,
    title: "Map-Based Search",
    description: "Find jobs near you with our interactive map view",
  },
  {
    icon: LightningIcon,
    title: "Instant Matching",
    description: "Get matched with jobs that fit your skills instantly",
  },
  {
    icon: ShieldIcon,
    title: "Trusted Employers",
    description: "Verified employers for safe and reliable work",
  },
  {
    icon: ClockIcon,
    title: "Flexible Hours",
    description: "Work when it suits your schedule",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary dark:text-primary">
            Why Choose{" "}
            <span className="text-primary dark:text-yellow-400">DayBee</span>?
          </h2>

          <p className="mt-4 text-lg text-secondary/70 dark:text-primary/70">
            The smartest way to find part-time work in Sri Lanka
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="hover:shadow-xl transform hover:scale-105 transit transition-all duration-300"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center mb-4">
                  <img src={feature.icon} alt={feature.title} className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">
                  {feature.title}
                </CardTitle>
                <CardDescription>
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
