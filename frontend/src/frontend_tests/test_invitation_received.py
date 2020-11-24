import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

url = "http://[2605:fd00:4:1001:f816:3eff:feb2:3536]/"

class TestInvitationReceived(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_invitation_received(self):
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
        # go to invitation_received component
        elem4 = driver.find_element_by_xpath("/html/body/div/div/div[2]/div[1]/div/div[3]/a")
        elem4.click()
        # check if received invitations exist in the table
        elem5 = driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div/table/tbody/tr[1]/td[1]")
        assert elem5 != None
        assert elem5.text != None   # check by Invitation Id
        # check Accept button
        # elem6 = driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div/table/tbody/tr[1]/td[5]/div/button[1]/span[1]")
        # assert elem6 != None
        # assert elem6.text == "Accept"
        # check Decline button
        # elem7 = driver.find_element_by_xpath("/html/body/div[1]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div/table/tbody/tr[1]/td[5]/div/button[2]/span[1]")
        # assert elem7 != None
        # assert elem7.text == "Decline"

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
    