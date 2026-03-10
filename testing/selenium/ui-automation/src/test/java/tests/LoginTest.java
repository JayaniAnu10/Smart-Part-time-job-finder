package tests;

import org.testng.annotations.Test;
import pages.LoginPage;

public class LoginTest extends BaseTest{

    LoginPage loginPage;

    public void login(String email, String password) {
        loginPage = new LoginPage(driver);
        loginPage.openLoginPage();
        loginPage.clickLoginTab();
        loginPage.enterEmail(email);
        loginPage.enterPassword(password);
        loginPage.clickLogin();
    }

    @Test
    public void testLogin() {
        login("rmlakshikarathnayake@gmail.com" , "123456");

    }
}
