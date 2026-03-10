package tests;

import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.PostLoginRegistrationPage;

import java.time.Duration;

public class JobSeekerRegistrationTest extends BaseTest {

    LoginTest loginTest;
    PostLoginRegistrationPage registrationPage;

    @Test
    public void testJobSeekerRegistration() throws InterruptedException  {

        // LOGIN FIRST
        loginTest = new LoginTest();
        loginTest.driver = this.driver;
        loginTest.login("lakshikasandeepani@gmail.com", "123456");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        registrationPage = new PostLoginRegistrationPage(driver);
        registrationPage.clickGetStarted();
        registrationPage.selectJobSeekerRegistration();
        registrationPage.enterFirstName("John");
        registrationPage.enterLastName("Doe");
        registrationPage.selectGender("Male");
        registrationPage.enterDOB("2000-01-01");
        registrationPage.enterNIC("122222222V");
        registrationPage.enterAddress("Colombo");
        registrationPage.clickNext();
        registrationPage.enterBio("Hardworking job seeker");
        Thread.sleep(2000);
        registrationPage.selectSkill("Customer Service");
        registrationPage.selectSkill("IT Support");
        registrationPage.acceptTerms();
        registrationPage.clickCreateAccount();
    }

}
