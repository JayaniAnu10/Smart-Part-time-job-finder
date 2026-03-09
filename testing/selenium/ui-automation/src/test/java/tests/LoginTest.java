package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.LoginPage;
import utils.DriverFactory;

import java.sql.Driver;

public class LoginTest {
    WebDriver driver;
    LoginPage loginPage;

    @BeforeMethod
    public void setUp() {
        driver = DriverFactory.getDriver();

        driver.get("http://localhost/");

        loginPage = new LoginPage(driver);
    }

    @Test
    public void testLogin() {
        loginPage.openLoginPage();

        loginPage.clickLoginTab();
        loginPage.enterEmail("lakshikasandeepani33@gmail.com");
        loginPage.enterPassword("123456");
        loginPage.clickLogin();
    }


}
