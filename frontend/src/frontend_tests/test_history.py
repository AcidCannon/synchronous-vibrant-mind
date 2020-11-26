import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

url = "http://[2605:fd00:4:1001:f816:3eff:feb2:3536]/"

class TestHistory(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_history(self):
        driver = self.driver
        # login first
        driver.get(url)
        # enter Username credential
        elem1 = driver.find_element_by_xpath("/html/body/div/div/div/div/div[2]/div[2]/div/div/div[2]/div/input")
        elem1.send_keys("zuhao")
        elem1.send_keys(Keys.ENTER)
        # enter Password credential
        elem2 = driver.find_element_by_xpath("/html/body/div/div/div/div/div[2]/div[2]/div/div/div[3]/div/input")
        elem2.send_keys("5201314mwxely")
        elem2.send_keys(Keys.ENTER)
        # click Log in button
        elem3 = driver.find_element_by_xpath("/html/body/div/div/div/div/div[2]/div[2]/div/div/button/span[1]")
        elem3.click()
        # wait for redirection to the homepage
        driver.implicitly_wait(10)
        # go to history component
        elem4 = driver.find_element_by_xpath("/html/body/div/div/div[2]/div[1]/div/div[5]/a")
        assert elem4 != None
        elem4.click()
        # check if history exists in the table
        elem5 = driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div/table/tbody/tr/td")
        assert elem5 != None
        assert elem5.text != ""   # "No Record" case accepted

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
    