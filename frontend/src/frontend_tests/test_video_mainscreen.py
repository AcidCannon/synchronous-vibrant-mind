import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "https://[2605:fd00:4:1001:f816:3eff:fef1:58d0]/webrtc?srcId=bdong1&targetId=lily1&roomName=VibrantMindsTogether1"

class TestVideoMainscreen(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_video_mainscreen(self):
        driver = self.driver
        driver.get(url)
        # show the mainscreen first
        elem1 = driver.find_element_by_xpath("/html/body/div/div/div/div[2]/button")
        assert elem1 != None
        elem1 = elem1.click()
        ############################
        # test jitsi               #
        # -manual acceptance tests #
        # test canvas              #
        # -manual acceptance tests #
        # test mahjong             #
        # -manual acceptance tests #
        ############################
        # test Logout button
        elem2 = driver.find_element_by_xpath("/html/body/div/div/div/div[1]/header/div/p[5]/a")
        assert elem2 != None
        elem2 = elem2.click()
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
    