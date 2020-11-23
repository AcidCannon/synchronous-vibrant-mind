import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

url = "http://[2605:fd00:4:1001:f816:3eff:feb2:3536]/"

class TestJitsi(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_notification(self):
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
        # go to notification component
        elem4 = driver.find_element_by_xpath("/html/body/div/div/div[2]/div[1]/div/div[6]/a")
        assert elem4 != None
        elem4.click()
        # check if notifications exist in the table
        elem5 = driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div/table/tbody/tr[1]/td[1]")
        assert elem5 != None
        assert elem5.text != "" # "No Record" case accepted

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
    