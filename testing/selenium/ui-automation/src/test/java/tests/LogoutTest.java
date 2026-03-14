package tests;

import base.BasePage;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;

public class LogoutTest extends BaseTest {
    BasePage basePage;
    LoginPage loginPage;

    @Test
    public void testLogout(){
        login("testuser1@example.com", "123456");

        basePage = new BasePage(driver);
        basePage.clickLogoutButton();

        Assert.assertTrue(basePage.isLoginButtonDisplayed(), "Login button is not visible after logout");




    }
}
