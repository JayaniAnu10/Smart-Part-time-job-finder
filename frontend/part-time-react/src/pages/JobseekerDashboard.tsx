import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import BellIcon from "@/assets/bell.svg";
import MoneyIcon from "@/assets/money.svg";
import BriefcaseIcon from "@/assets/logo-icon.svg";
import StarIcon from "@/assets/star-darkBlue.svg";
import ApplicationIcon from "@/assets/applications.svg";
import ClockIcon from "@/assets/clock.svg";
import ClockIconDark from "@/assets/clock-yellow.svg";
import MoneyIconDark from "@/assets/money-darkmode.svg";
import StarIconYellow from "@/assets/star.svg";
import BadgeIcon from "@/assets/badge.svg";
import AnalyticsIcon from "@/assets/companies.svg";

import NavBar from "@/components/navBar/NavBar";
import FooterSection from "@/components/FooterSection";


const JobseekerDashboard = () => {
  return (
    <div className="relative pt-24 min-h-screen bg-background">

      <NavBar />
      
      <section className="bg-gradient-to-br from-yellow-400/20 via-background to-yellow-400/20 dark:from-blue-300/20 dark:via-background dark:to-blue-300/20 border-b">
        <div className="max-w-[88rem] mx-auto px-4 h-[140px] flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary dark:text-primary ">
              Wellcome back,{" "}
              <span className="text-primary dark:text-yellow-400">Kamal</span>! 👋
            </h1>
            <p className="mt-2 text-secondary/70 dark:text-primary/70">
              You have 3 upcoming jobs this week
            </p>
          </div>

          <Button className="gap-2 text-secondary dark:bg-yellow-400 transition-all duration-300
                             hover:scale-105 active:scale-95 hover:bg-yellow-400 hover:bg-yellow-400 hover:shadow-[0_0_4px_rgba(250,204,21,0.5)]">
            <img src={BellIcon} alt="notifications" className="h-4 w-4 " />
            View Notifications
          </Button>
        </div>
      </section>

      <section className="pt-12 max-w-[88rem] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {[
            {icon: MoneyIcon, label: "Total Earnings", value: "Rs 45,000"},
            {icon: BriefcaseIcon, label: "Jobs Completed", value: "23"},
            {icon: StarIcon, label: "Trust Score", value: "No ratings yet"},
            {icon: ApplicationIcon, label: "Active Applications", value: "7"},
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-start gap-3 p-6">
                <div className="bg-yellow-400 h-12 w-12 rounded-lg flex items-center justify-center">
                  <img src={item.icon} alt="" className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary dark:text-primary">
                    {item.value}
                  </p>
                  <p className="text-sm text-secondary/70 dark:text-primary/70">
                    {item.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="pt-12 max-w-[88rem] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE - UPCOMING JOBS */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-secondary dark:text-primary">Upcoming Jobs</h2>
                <Button variant="outline" className="text-secondary dark:text-primary hover:bg-yellow-400 hover:text-secondary
                                                     transition-all duration-300 hover:scale-105 active:scale-95">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {title: "Delivery Driver",company: "QuickFood",time: "Today, 2:00 PM",pay: "Rs 2,000",status: "Confirmed",},
                  {title: "Retail Assistant",company: "Fashion Hub",time: "Tomorrow, 10:00 AM",pay: "Rs 1,500",status: "Pending",},
                  {title: "Event Staff",company: "Party Planners",time: "Dec 28, 6:00 PM",pay: "Rs 3,000",status: "Confirmed",},  
                ].map((job, i) => (
                  <Card key={i} className="transition-duration duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
                      
                      <div className="flex gap-4">
                        
                        <div className="bg-yellow-400 h-12 w-12 rounded-lg flex items-center justify-center shrink-0">
                          <img
                            src={BriefcaseIcon}
                            alt="job icon"
                            className="h-6 w-6"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-secondary dark:text-primary">{job.title}</h3>
                          <p className="text-sm text-secondary/80 dark:text-primary/80">
                            {job.company}
                          </p>
                        
                          <div className="flex items-center gap-4 mt-2 text-sm text-secondary/80 dark:text-primary/80">
                            <div className="flex items-center gap-1">
                              <img src={ClockIcon} alt="time" className="h-4 w-4 dark:hidden"/>
                              <img src={ClockIconDark} alt="time" className="h-4 w-4 hidden dark:block"/>
                              <span>{job.time}</span>
                            </div>

                            <div className="flex items-center gap-1 text-yellow-400 font-medium">
                              <img src={MoneyIcon} className="h-4 w-4 dark:hidden" />
                              <img src={MoneyIconDark} className="h-4 w-4 hidden dark:block" />
                              <span>{job.pay}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 ">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            job.status === "Confirmed"
                              ? "bg-yellow-400/10 text-yellow-400"
                              : "bg-[#364d7d]/10 text-[#364d7d] dark:text-primary/70"
                         }`}
                        >
                          {job.status}
                        </span>

                        <Button variant="outline" className="text-secondary dark:text-primary transition-all duration-300 hover:scale-105 active:scale-95
                                                             hover:text-secondary hover:bg-yellow-400">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE PANEL */}
            <div className="space-y-6">

              <Card className="w-full mx-auto rounded-2xl">
                <CardContent className="p-8 text-center space-y-5">
                  <div className="flex items-start gap-2">
                    <img src={StarIconYellow} alt="trust score" className="h-6 w-6" />
                    <h3 className="text-lg font-semibold text-secondary dark:text-primary">Trust Score</h3>
                  </div>

                  <div className="text-5xl font-bold text-yellow-400">
                    0.0
                  </div>

                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="relative">
                        <img src={StarIcon} alt="rating star" className="h-5 w-5 dark:hidden"/>
                        <img src={StarIconYellow} alt="rating star" className="h-5 w-5 hidden dark:block" />
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-secondary dark:text-primary">No ratings yet</p>

                  <Button
                    variant="outline"
                    className="w-full text-secondary dark:text-primary hover:bg-yellow-400 hover:text-secondary
                               transition-all duration-300 hover:scale-105 active:scale-95">
                    View Full Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="w-full mx-auto rounded-2xl">
                <CardContent className="p-8 text-center space-y-5">

                  <div className="flex items-center gap-2">
                    <img src={BadgeIcon} alt="badge" className="w-6 h-6" />
                    <h3 className="text-lg font-semibold text-secondary dark:text-primary">
                      Your Badges
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                   
                    <div className="rounded-xl bg-yellow-400 text-center py-6 space-y-2 shadow-lg">
                      <span className="text-2xl">⚡</span>
                      <p className="font-sm text-secondary">
                        Quick Responder
                      </p>
                    </div>

                    <div className="rounded-xl bg-yellow-400 text-center py-6 space-y-2 shadow-lg">
                       <span className="text-2xl">✓</span>
                      <p className="font-sm text-secondary ">
                        Perfect Attendance
                      </p>
                    </div>
                    
                    <div className="rounded-xl bg-[#364d7d]/10 dark:bg-primary/60 text-center py-6 space-y-2 shadow-lg">
                    <span className="text-2xl">⭐</span>
                      <p className="text-sm text-secondary ">
                        5-Star Performer
                      </p>
                    </div>
                    
                    <div className="rounded-xl bg-[#364d7d]/10 dark:bg-primary/60 text-center py-6 space-y-2 shadow-lg">
                      <span className="text-2xl">💰</span>
                      <p className="text-sm text-secondary">
                        Top Earner
                      </p>
                    </div>

                  </div>
                </CardContent>
              </Card>

              <Card className="w-full mx-auto rounded-2xl">
                <CardContent className="p-8 text-center space-y-5">
                  
                  <div className="flex items-center gap-2">
                    <img src={AnalyticsIcon} alt="analytics" className="w-6 h-6" />
                    <h3 className="text-lg font-semibold text-secondary dark:text-primary">
                      This Month
                    </h3>
                  </div>
                  
                  <div className="space-y-4 text-sm">

                    <div className="flex justify-between items-center">
                      <p className="text-secondary/80 dark:text-primary/80">Jobs</p>
                      <p className="text-secondary/80 dark:text-primary/80 font-semibold">12</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-secondary/80 dark:text-primary/80">Earnings</p>
                      <p className="text-yellow-400 font-semibold">Rs 24,000</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-secondary/80 dark:text-primary/80">Hours</p>
                      <p className="text-secondary/80 dark:text-primary/80 font-semibold">68h</p>
                    </div>
                   </div>
                </CardContent>
              </Card>

            </div>
        </div>
      </section>

      <section className="pt-12">
        <FooterSection />
      </section>      
      
    </div>
 );
}

export default JobseekerDashboard;