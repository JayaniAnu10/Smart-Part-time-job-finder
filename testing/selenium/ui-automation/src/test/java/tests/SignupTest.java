package tests;

import org.testng.annotations.Test;
import pages.SignupPage;

public class SignupTest extends BaseTest {

    SignupPage signupPage;

    @Test
    public void testSignup() {
        signupPage = new SignupPage(driver);

        signupPage.openSignupPage();
        signupPage.clickSignupTab();
        signupPage.enterEmail("lakshikasandeepani@gmail.com");
        signupPage.enterContactNo("0721111111");
        signupPage.enterPassword("123456");
        signupPage.enterConfirmPassword("123456");
        signupPage.clickSignupButton();
    }
}
