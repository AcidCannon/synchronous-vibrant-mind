
"""
Modify this file
"""
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

"""
Refer to https://selenium-python.readthedocs.io/locating-elements.html
for more information on how to locate elements
"""

url = "http://[2605:fd00:4:1001:f816:3eff:feb2:3536]/webrtc"

def test_jitsi():
    driver = webdriver.Chrome()
    driver.get(url)
    e = driver.find_element_by_id(By.linkText("Join meeting"))
    element = e.click()
    assert element != None

    driver.quit()
    