import { Card, CardContent } from "@/components/ui/card"

import Step1Icon from "@/assets/group.svg"
import Step2Icon from "@/assets/find-jobs.svg"
import Step3Icon from "@/assets/start-earning.svg"

const steps = [
  {
    step: "1",
    title: "Create Profile",
    description: "Sign up and complete your profile in minutes",
    icon: Step1Icon,
  },
  {
    step: "2",
    title: "Find Jobs",
    description: "Browse jobs on map or list view and apply instantly",
    icon: Step2Icon,
  },
  {
    step: "3",
    title: "Start Earning",
    description: "Get hired and start earning on your schedule",
    icon: Step3Icon,
  },
]

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary dark:text-primary">
            How It <span className="text-primary dark:text-yellow-400">Works</span>
          </h2>
          <p className="mt-4 text-lg text-secondary/70 dark:text-primary/70">
            Get started in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-8">
          {steps.map((item, index) => (
            <Card
              key={index}
              className="relative max-w-sm mx-auto text-center border border-border/70
                         hover:shadow-xl transition-all duration-300"
            >
          
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <div className="h-10 w-10 rounded-full bg-primary dark:bg-yellow-400 text-secondary
                                flex items-center justify-center font-bold">
                  {item.step}
                </div>
              </div>

              <CardContent className="pt-12 pb-10">
                <div className="flex justify-center mb-6">
                  <img src={item.icon} alt={item.title} className="h-14 w-14" />
                </div>

                <h3 className="text-xl font-semibold text-secondary dark:text-primary mb-3">
                  {item.title}
                </h3>

                <p className="text-secondary/80 dark:text-primary/80 max-w-xs mx-auto">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HowItWorksSection
