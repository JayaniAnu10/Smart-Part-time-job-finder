import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function CTASection() {
  return (
    <section className="mx-auto my-20 max-w-5xl px-4">
      <div className="rounded-2xl bg-yellow-400/80 px-8 py-16 md:px-20 md:py-20 text-center shadow-lg">
        <h2 className="text-2xl font-bold text-secondary md:text-4xl lg:text-5xl">
          Ready to Start Your Journey?
        </h2>

        <p className="mt-4 text-lg text-secondary/70">
          Join thousands of Sri Lankans finding flexible work opportunities every day
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          
          <Button size="lg" asChild className="bg-primary-foreground dark:bg-primary text-secondary px-8 transition-all duration-300
                                               hover:scale-105 active:scale-95 hover:bg-primary-foreground hover:dark:bg-primary shadow-lg">
            <Link to="/getstarted">
              Get Started Free
            </Link>
          </Button>
          
          <Button size="lg" asChild className="bg-primary-foreground dark:bg-primary border border-secondary text-secondary
                                               px-8 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-primary-foreground/70 hover:dark:bg-primary/70">
            <Link to="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
