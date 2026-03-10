package tests;

import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;
import pages.PostLoginEmployerRegistrationPage;

import java.time.Duration;

public class PostLoginEmployerRegistrationTest extends BaseTest {

    LoginTest loginTest;
    PostLoginEmployerRegistrationPage employerRegistrationPage;

    @Test
    public void testEmployerRegistration() {

        // LOGIN FIRST
        loginTest = new LoginTest();
        loginTest.driver = this.driver;
        loginTest.login("lakshikasandeepani@gmail.com", "123456");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        employerRegistrationPage = new PostLoginEmployerRegistrationPage(driver);
        employerRegistrationPage.clickGetStartedFreeBtn();
        employerRegistrationPage.chooseEmployerRegistration();
        employerRegistrationPage.enterCompanyName("DemoEmployer LTD");
        employerRegistrationPage.enterBusinessID("PV12222222");
        employerRegistrationPage.enterContactPerson("demoPerson");
        employerRegistrationPage.enterContactNo("0721111111");
        employerRegistrationPage.enterAddress("Colombo");
        employerRegistrationPage.clickNextButton();
        employerRegistrationPage.selectIndustry("Retail");
        employerRegistrationPage.enterWebsiteLink("https://www.demo.com");
        employerRegistrationPage.enterDescription("description");
        employerRegistrationPage.acceptTerms();
        employerRegistrationPage.clickCreateAccount();


    }
}
