import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Check,
  Crown,
  Rocket,
  Star,
  Zap,
  SkipForward,
} from "lucide-react";
import usePromo from "@/hooks/usePromo";
import useCheckout from "@/hooks/useCheckout";
import { useAuthStore } from "@/store/AuthStore";

interface PromotionPlan {
  id: number;
  name: string;
  price: number;
  duration: number;
  icon: React.ReactNode;
  color: string;
  features: string[];
  popular?: boolean;
}

const JobPromotion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  const { jobId } = useParams<{ jobId: string }>();
  const jobTitle = location.state?.title || "Your Job";
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const { data: promotions } = usePromo();

  const getIconByName = (name: string) => {
    if (name.toLowerCase().includes("basic"))
      return <Star className="w-8 h-8" />;
    if (name.toLowerCase().includes("standard"))
      return <Rocket className="w-8 h-8" />;
    if (name.toLowerCase().includes("premium"))
      return <Crown className="w-8 h-8" />;
    return <Zap className="w-8 h-8" />;
  };

  const getColorByName = (name: string) => {
    if (name.toLowerCase().includes("basic"))
      return "from-blue-500 to-blue-600";
    if (name.toLowerCase().includes("standard"))
      return "from-yellow-400 to-yellow-400/80";
    if (name.toLowerCase().includes("premium"))
      return "from-amber-500 to-orange-500";
    return "from-gray-400 to-gray-500";
  };

  const getFeaturesByName = (name: string): string[] => {
    if (name.toLowerCase().includes("basic"))
      return ["Featured badge", "Top placement", "Basic analytics"];

    if (name.toLowerCase().includes("standard"))
      return ["Promoted badge", "Priority search", "Detailed analytics"];

    if (name.toLowerCase().includes("premium"))
      return ["Premium badge", "Homepage feature", "Max visibility"];

    return [];
  };

  const promotionPlans: PromotionPlan[] =
    promotions?.map((promo) => ({
      id: promo.id, // UUID
      name: promo.name,
      price: promo.price,
      duration: promo.days,
      icon: getIconByName(promo.name),
      color: getColorByName(promo.name),
      features: getFeaturesByName(promo.name),
      popular: promo.name.toLowerCase().includes("standard"),
    })) ?? [];

  const { mutate: checkout } = useCheckout();

  const handlePromotionSelect = (promotionCategoryId: number) => {
    checkout({
      userId: user?.id!,
      jobId: jobId!,
      promotionCategoryId,
    });
  };

  const handleSkip = () => {
    navigate("/empDashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("common.back", "Back")}
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 rounded-full text-yellow-400 mb-4">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">
              Job Published Successfully!
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Boost Your Job Visibility
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your job{" "}
            <span className="font-semibold text-foreground">"{jobTitle}"</span>{" "}
            is now live! Promote it to reach more candidates and fill your
            position faster.
          </p>
        </div>

        {/* Promotion Plans */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {promotionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-6 transition-all duration-300 hover:shadow-xl cursor-pointer ${
                selectedPlan === plan.id
                  ? "ring-2 ring-yellow-400 shadow-lg scale-[1.02]"
                  : "hover:scale-[1.01]"
              } ${plan.popular ? "border-yellow-400 border-2" : "border-2 "}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400">
                  Most Popular
                </Badge>
              )}

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${plan.color} flex items-center justify-center text-white mb-6 mx-auto`}
              >
                {plan.icon}
              </div>

              {/* Plan Details */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    LKR {plan.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.duration} days promotion
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-yellow-400" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-linear-to-r " + plan.color + " hover:opacity-90"
                    : "hover:bg-yellow-400 hover:text-black"
                }`}
                variant={plan.popular ? "default" : "outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePromotionSelect(plan.id);
                }}
              >
                Select Plan
              </Button>
            </Card>
          ))}
        </div>

        {/* Skip Option */}
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-[#0f1f3d]"
            onClick={handleSkip}
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobPromotion;
