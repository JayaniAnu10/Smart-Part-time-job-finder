package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.PostLoginEmployerRegistrationPage;

import java.time.Duration;

public class PostLoginEmployerRegistrationTest extends BaseTest {

    PostLoginEmployerRegistrationPage employerRegistrationPage;

    @Test
    public void testEmployerRegistration() {

        //login
        login("testuser1@example.com", "123456");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        employerRegistrationPage = new PostLoginEmployerRegistrationPage(driver);
        employerRegistrationPage.clickGetStartedFreeBtn();
        employerRegistrationPage.chooseEmployerRegistration();
        employerRegistrationPage.enterCompanyName("DemoEmployer LTD");
        employerRegistrationPage.enterBusinessID("PV22222222");
        employerRegistrationPage.enterContactPerson("demoPerson");
        employerRegistrationPage.enterContactNo("0721111111");
        employerRegistrationPage.enterAddress("Colombo");
        employerRegistrationPage.clickNextButton();
        employerRegistrationPage.selectIndustry("Retail");
        employerRegistrationPage.enterWebsiteLink("https://www.demo.com");
        employerRegistrationPage.enterDescription("description");
        employerRegistrationPage.acceptTerms();
        employerRegistrationPage.clickCreateAccount();

        WebElement dashboardBtn = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//button[normalize-space()='Dashboard']")
                )
        );

        Assert.assertNotNull(dashboardBtn);
        Assert.assertTrue(dashboardBtn.isDisplayed(),"User was not directed to landing page after registration");



    }
}
