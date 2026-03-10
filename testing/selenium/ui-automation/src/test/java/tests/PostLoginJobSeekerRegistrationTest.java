package tests;

import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;
import pages.PostLoginJobseekerRegistrationPage;

import java.time.Duration;

public class PostLoginJobSeekerRegistrationTest extends BaseTest {

    LoginTest loginTest;
    PostLoginJobseekerRegistrationPage seekerRegistrationPage;

    @Test
    public void testJobSeekerRegistration() throws InterruptedException  {

        // LOGIN FIRST
        loginTest = new LoginTest();
        loginTest.driver = this.driver;
        loginTest.login("rmlakshikarathnayake@gmail.com", "123456");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        seekerRegistrationPage = new PostLoginJobseekerRegistrationPage(driver);
        seekerRegistrationPage.clickGetStarted();
        seekerRegistrationPage.selectJobSeekerRegistration();
        seekerRegistrationPage.enterFirstName("John");
        seekerRegistrationPage.enterLastName("Doe");
        seekerRegistrationPage.selectGender("Male");
        seekerRegistrationPage.enterDOB("2000-01-01");
        seekerRegistrationPage.enterNIC("122222222V");
        seekerRegistrationPage.enterAddress("Colombo");
        seekerRegistrationPage.clickNext();
        seekerRegistrationPage.enterBio("Hardworking job seeker");
        Thread.sleep(2000);
        seekerRegistrationPage.selectSkill("Customer Service");
        seekerRegistrationPage.selectSkill("IT Support");
        seekerRegistrationPage.acceptTerms();
        seekerRegistrationPage.clickCreateAccount();
    }

}
