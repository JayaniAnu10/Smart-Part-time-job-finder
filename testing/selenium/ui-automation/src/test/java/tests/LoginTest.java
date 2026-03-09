package tests;

import org.testng.annotations.Test;
import pages.LoginPage;
public class LoginTest extends BaseTest{

    LoginPage loginPage;

    @Test
    public void testLogin() {
        loginPage = new LoginPage(driver);

        loginPage.openLoginPage();
        loginPage.clickLoginTab();
        loginPage.enterEmail("lakshikasandeepani33@gmail.com");
        loginPage.enterPassword("123456");
        loginPage.clickLogin();
    }
}
