import { Card, CardContent, CardHeader } from "@/components/ui/card";

import StarIcon from "@/assets/ratings.svg";
import QuoteIcon from "@/assets/quote.svg";

const testimonials = [
  {
    text: "DayBee made finding part-time work so easy! I found a perfect delivery job within hours. The map feature is brilliant!",
    name: "Kamal P.",
  },
  {
    text: "As an employer, posting jobs is super fast and I get quality applicants immediately. Best platform for part-time hiring!",
    name: "Sarah M.",
  },
  {
    text: "The trust score system gives me confidence. I've had amazing experiences with every job I've taken through DayBee!",
    name: "Nuwan R.",
  },
];

const RatingsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-40 via-blue-100/40 dark:via-blue-100/10 to-background">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={StarIcon} alt="star" className="h-6 w-6" />
            ))}
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary dark:text-primary">
            Rated <span className="text-primary dark:text-yellow-400">4.9/5</span> by Users
          </h2>

          <p className="mt-4 text-lg text-secondary/70 dark:text-primary/70">
            Trusted by thousands of job seekers and employers across Sri Lanka
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Card
              key={index}
              className="border border-border hover:shadow-xl transition-shadow transform hover:scale-105 transition-all duration-300"
            >
              <CardHeader>
                <img src={QuoteIcon} alt="quote" className="h-8 w-8" />
              </CardHeader>

              <CardContent>
                <p className="italic text-secondary/80 dark:text-primary/80">
                  “{item.text}”
                </p>

                <div className="mt-6">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={StarIcon} alt="star" className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="font-semibold text-secondary dark:text-primary">
                    {item.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RatingsSection;
