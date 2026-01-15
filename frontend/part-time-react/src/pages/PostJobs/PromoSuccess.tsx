import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Eye,
  Sparkles,
} from "lucide-react";
import usePromoSuccess from "@/hooks/usePromoSuccess";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import toast from "react-hot-toast";

const PromoSuccess = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = usePromoSuccess();
  console.log(data);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Something went wrong");
    }
  }, [error]);

  const benefits = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Increased Visibility",
      description: "Your job will appear at the top of search results",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Featured Badge",
      description: "Stand out with a premium badge on your listing",
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <Spinner />
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30 mb-5">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your job promotion is now active
          </p>
          <Card className="p-6 mb-8 text-left bg-linear-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {data?.jobTitle || "Your Job"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {data?.planName} - {data?.duration} days promotion
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                  <span className="text-sm text-muted-foreground">
                    Amount Paid
                  </span>
                  <span className="text-lg font-bold text-primary">
                    LKR {data?.price?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
            </div>
          </Card>
          {/* Benefits */}
          <h2 className="text-lg font-semibold text-foreground mb-4">
            What you get
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1">
                  {benefit.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
          <div className="mb-5 gap-5 flex items-center justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/empDashboard")}
              className="gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/find-your-job")}
            >
              View All Jobs
            </Button>
          </div>
          {/* Receipt Note */}
          <span className="text-muted-foreground">
            A confirmation email has been sent to your registered email address.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoSuccess;
