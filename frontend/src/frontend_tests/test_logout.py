import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "http://[2605:fd00:4:1001:f816:3eff:feb2:3536]/"

class TestLogout(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_logout(self):
        driver = self.driver
        # login first
        driver.get(url)
        # enter Username credential
        elem1 = driver.find_element_by_xpath("/html/body/div/div/div/div/div[2]/div[2]/div/div/div[2]/div/input")
        assert elem1 != None
        elem1.send_keys("zuhao")
        elem1.send_keys(Keys.ENTER)
        # enter Password credential
        elem2 = driver.find_element_by_xpath("/html/body/div/div/div/div/div[2]/div[2]/div/div/div[3]/div/input")
        assert elem2 != None
        elem2.send_keys("5201314mwxely")
        elem2.send_keys(Keys.ENTER)
        # click Log in button
        elem3 = driver.find_element_by_xpath("/html/body/div/div/div/div/div[2]/div[2]/div/div/button/span[1]")
        assert elem3 != None
        elem3.click()
        # wait for redirection to the homepage
        driver.implicitly_wait(10)
        # test Logout button
        elem4 = driver.find_element_by_xpath("/html/body/div/div/div[1]/header/div/p[5]/a")
        assert elem4 != None
        elem4 = elem4.click()
        # wait for the expected condition
        try:
            WebDriverWait(driver, 10).until(
                EC.title_is(("React App"))
            )
        except Exception as e:
            print("Wrong page: {0}".format(e))

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
    