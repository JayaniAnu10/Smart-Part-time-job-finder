import { StarRating } from "@/components/common/StarRating";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Star } from "lucide-react";

interface Rate {
  averageRate: number;
  reviews: number;
}

const EmployerRating = ({ averageRate, reviews }: Rate) => {
  return (
    <Card className="mt-6 p-4 md:p-8 border hover:shadow-lg/10 shadow-yellow-400 shadow-none hover:scale-102 transition-transform duration-300">
      <h3 className="text-lg md:text-2xl font-semibold mb-4 flex items-center gap-2">
        <Star className="w-7 h-7 text-yellow-400" />
        Employer Rating
      </h3>
      <div className="flex items-center gap-4">
        <div className="text-3xl md:text-5xl font-bold text-yellow-400 ">
          {averageRate}
        </div>
        <div>
          <div className="flex gap-1 mb-1">
            {averageRate ? (
              <div className="flex gap-1 mb-1">
                <StarRating rating={averageRate} className="text-yellow-400 " />
              </div>
            ) : (
              <Spinner />
            )}
          </div>
          <p className="text-md text-muted-foreground">
            Based on {reviews} reviews
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EmployerRating;
