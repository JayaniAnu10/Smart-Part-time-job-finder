import FacebookIcon from "@/assets/facebook-logo.png";
import TwitterIcon from "@/assets/twitter-logo.png";
import InstagramIcon from "@/assets/instagram-logo.png";
import LinkedinIcon from "@/assets/linkedin-logo.png";
import whatsappIcon from "@/assets/whatsapp-logo.png";
import LogoIconLightmode from "@/assets/daybee-lightmode.png";
import LogoIconDarkmode from "@/assets/daybee-darkmode.png"

const FooterSection = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-[88rem] mx-auto px-4 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">

          <div className="flex flex-col items-start text-left ">
            <div className="flex items-center mb-4">
              <img src={LogoIconLightmode} alt="DayBee logo light" className="h-10 w-45 dark:hidden" />
              <img src={LogoIconDarkmode} alt="DayBee logo dark" className="h-10 w-45 hidden dark:inline "/>
            </div>

            <p className="text-secondary/80 dark:text-primary/70 text-sm leading-relaxed">
              Sri Lanka's premier part-time job platform.
              Find flexible work opportunities near you.
            </p>

            <div className="flex gap-3 mt-6">
              <img src={FacebookIcon} alt="Facebook" className="h-5 w-5 cursor-pointer opacity-70 hover:opacity-100" />
              <img src={TwitterIcon} alt="Twitter" className="h-5 w-5 cursor-pointer opacity-70 hover:opacity-100" />
              <img src={InstagramIcon} alt="Instagram" className="h-5 w-5 cursor-pointer opacity-70 hover:opacity-100" />
              <img src={LinkedinIcon} alt="LinkedIn" className="h-5 w-5 cursor-pointer opacity-70 hover:opacity-100" />
              <img src={whatsappIcon} alt="LinkedIn" className="h-5 w-5 cursor-pointer opacity-70 hover:opacity-100" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-secondary dark:text-primary mb-4">
              For Job Seekers
            </h4>
            <ul className="space-y-3 text-sm text-secondary/80 dark:text-primary/70">
              <li className="hover:text-primary cursor-pointer">Browse Jobs</li>
              <li className="hover:text-primary cursor-pointer">My Dashboard</li>
              <li className="hover:text-primary cursor-pointer">My Profile</li>
              <li className="hover:text-primary cursor-pointer">Saved Jobs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-secondary dark:text-primary mb-4">
              For Employers
            </h4>
            <ul className="space-y-3 text-sm text-secondary/80 dark:text-primary/70">
              <li className="hover:text-primary cursor-pointer">Post a Job</li>
              <li className="hover:text-primary cursor-pointer">Employer Dashboard</li>
              <li className="hover:text-primary cursor-pointer">Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-secondary dark:text-primary mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-secondary/80 dark:text-primary/70">
              <li className="hover:text-primary cursor-pointer">About Us</li>
              <li className="hover:text-primary cursor-pointer">Contact</li>
              <li className="hover:text-primary cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-sm text-secondary/60 dark:text-primary/60">
          © 2025 DayBee.lk. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
