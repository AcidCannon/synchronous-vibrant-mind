from django.test import TestCase
import unittest
from django.test import Client
import datetime
import json
# ./manage.py test api.tests
# Create your tests here.

class MyTest(unittest.TestCase):
    
    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    #test addPlayer
    def testAddPlayer(self):
        requests = self.client
        url1 = '/addPlayer'
        js1 = {"name": "eee", "email" : "eee@ualberta.ca"}
        js2 = {"name": "fff", "email" : "fff@ualberta.ca"}
        js3 = {"nam": "ddd", "email" : "ddd@ualberta.ca"}
        js4 = {"name": "dd"}
        js5 = {"email" : "ddd@ualberta.ca"}
        r1 = requests.post(url1, js1)
        r2 = requests.post(url1, js2)
        r3 = requests.post(url1, js3)
        r4 = requests.post(url1, js4)
        r5 = requests.post(url1, js5)
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['status'], "success")
        self.assertEqual(r2.json()['status'], "success")
        self.assertEqual(r3.json()['status'], "fail")
        self.assertEqual(r4.json()['status'], "fail")
        self.assertEqual(r5.json()['status'], "fail")

    #test sendInvitation
    def testSendInvitation(self):
        requests = self.client
        t1 = datetime.datetime(2020,10,17,8,0,0,0)
        t2 = datetime.datetime(2020,10,17,8,20,0,0)
        t3 = datetime.datetime(2020,10,17,9,10,0,0)
        t4 = datetime.datetime(2020,10,17,9,20,0,0)
        t5 = datetime.datetime(2020,10,18,8,10,0,0)
        t6 = datetime.datetime(2020,10,18,8,11,0,0)
        t7 = datetime.datetime(2020,10,18,9,0,0,0)
        t8 = datetime.datetime(2020,10,18,9,10,0,0)
        t9 = datetime.datetime(2020,11,18,9,10,0,0)
        t10 = datetime.datetime(2020,12,18,9,10,0,0)
        t11 = datetime.datetime(2020,12,18,9,20,0,0)
        url2 = '/sendInvitation'
        js6 = {"inviter_email" : "eee@ualberta.ca", "invitee_email" : "fff@ualberta.ca", "start_time": t1}
        js7 = {"invite_email" : "eee@ualberta.ca", "invitee_email" : "fff@ualberta.ca", "start_time": t1}
        js8 = {"inviter_email" : "fff@ualberta.ca", "invitee_email" : "eee@ualberta.ca", "start_time": t5}
        js9 = {"invitee_email" : "fff@ualberta.ca", "start_time": t1}
        js10 = {"inviter_email" : "eee@ualberta.ca", "start_time": t1}
        js11 = {"inviter_email" : "fff@ualberta.ca", "invitee_email" : "eee@ualberta.ca"}
        r6 = requests.post(url2, js6)
        r7 = requests.post(url2, js7)
        r8 = requests.post(url2, js8)
        r9 = requests.post(url2, js9)
        r10 = requests.post(url2, js10)
        r11 = requests.post(url2, js11)
        self.assertEqual(r6.status_code, 200)
        self.assertEqual(r6.json()['status'], "success")
        self.assertEqual(r7.json()['status'],"fail")
        self.assertEqual(r8.json()['status'],"success")
        self.assertEqual(r9.json()['status'],"fail")
        self.assertEqual(r10.json()['status'],"fail")
        self.assertEqual(r11.json()['status'],"fail")


    #test getInvitationReceived
    def testGetInvitationReceived(self):
        requests = self.client
        requests = self.client
        url1 = '/addPlayer'
        js1 = {"name": "eee", "email" : "eee@ualberta.ca"}
        js2 = {"name": "fff", "email" : "fff@ualberta.ca"}
        js3 = {"nam": "ddd", "email" : "ddd@ualberta.ca"}
        js4 = {"name": "dd"}
        js5 = {"email" : "ddd@ualberta.ca"}
        r1 = requests.post(url1, js1)
        r2 = requests.post(url1, js2)
        r3 = requests.post(url1, js3)
        r4 = requests.post(url1, js4)
        r5 = requests.post(url1, js5)
        
        t1 = datetime.datetime(2020,10,17,8,0,0,0)
        t2 = datetime.datetime(2020,10,17,8,20,0,0)
        t3 = datetime.datetime(2020,10,17,9,10,0,0)
        t4 = datetime.datetime(2020,10,17,9,20,0,0)
        t5 = datetime.datetime(2020,10,18,8,10,0,0)
        t6 = datetime.datetime(2020,10,18,8,11,0,0)
        t7 = datetime.datetime(2020,10,18,9,0,0,0)
        t8 = datetime.datetime(2020,10,18,9,10,0,0)
        t9 = datetime.datetime(2020,11,18,9,10,0,0)
        t10 = datetime.datetime(2020,12,18,9,10,0,0)
        t11 = datetime.datetime(2020,12,18,9,20,0,0)
        url2 = '/sendInvitation'
        js6 = {"inviter_email" : "eee@ualberta.ca", "invitee_email" : "fff@ualberta.ca", "start_time": t1}
        js7 = {"invite_email" : "eee@ualberta.ca", "invitee_email" : "fff@ualberta.ca", "start_time": t1}
        js8 = {"inviter_email" : "fff@ualberta.ca", "invitee_email" : "eee@ualberta.ca", "start_time": t5}
        js9 = {"invitee_email" : "fff@ualberta.ca", "start_time": t1}
        js10 = {"inviter_email" : "eee@ualberta.ca", "start_time": t1}
        js11 = {"inviter_email" : "fff@ualberta.ca", "invitee_email" : "eee@ualberta.ca"}
        r6 = requests.post(url2, js6)
        r7 = requests.post(url2, js7)
        r8 = requests.post(url2, js8)
        r9 = requests.post(url2, js9)
        r10 = requests.post(url2, js10)
        r11 = requests.post(url2, js11)

        url3 = '/getInvitationReceived'
        
        js12 = {"inviter_email" : "eee@ualberta.ca"}
        js13 = {"inviter_email" : "fff@ualberta.ca"}
        js14 = {"inviter_email" : "no@ualberta.ca"}
        js15 = {"invite_email" : "eee@ualberta.ca"}
        js16 = {"inviter_email" : "a@ualberta.ca"}
        
        r12 = requests.post(url3, data = js12)
        r13 = requests.post(url3, data = js13)
        r14 = requests.post(url3, data = js14)
        r15 = requests.post(url3, data = js15)
        r16 = requests.post(url3, data = js16)
        self.assertEqual(r12.status_code, 200)
        self.assertEqual(r12.json()['status'],"fail")
        self.assertEqual(r13.status_code, 200)
        self.assertEqual(r14.json()['status'],"fail")
        self.assertEqual(r14.status_code, 200)
        self.assertEqual(r15.json()['status'],"fail")
        self.assertEqual(r16.json()['status'],"fail")

    #test getInvitationSent
    def testGetInvitationSent(self):
        requests = self.client
        url1 = '/addPlayer'
        js1 = {"name": "eee", "email" : "eee@ualberta.ca"}
        js2 = {"name": "fff", "email" : "fff@ualberta.ca"}
        js3 = {"nam": "ddd", "email" : "ddd@ualberta.ca"}
        js4 = {"name": "dd"}
        js5 = {"email" : "ddd@ualberta.ca"}
        r1 = requests.post(url1, js1)
        r2 = requests.post(url1, js2)
        r3 = requests.post(url1, js3)
        r4 = requests.post(url1, js4)
        r5 = requests.post(url1, js5)
        
        t1 = datetime.datetime(2020,10,17,8,0,0,0)
        t2 = datetime.datetime(2020,10,17,8,20,0,0)
        t3 = datetime.datetime(2020,10,17,9,10,0,0)
        t4 = datetime.datetime(2020,10,17,9,20,0,0)
        t5 = datetime.datetime(2020,10,18,8,10,0,0)
        t6 = datetime.datetime(2020,10,18,8,11,0,0)
        t7 = datetime.datetime(2020,10,18,9,0,0,0)
        t8 = datetime.datetime(2020,10,18,9,10,0,0)
        t9 = datetime.datetime(2020,11,18,9,10,0,0)
        t10 = datetime.datetime(2020,12,18,9,10,0,0)
        t11 = datetime.datetime(2020,12,18,9,20,0,0)
        url2 = '/sendInvitation'
        js6 = {"inviter_email" : "eee@ualberta.ca", "invitee_email" : "fff@ualberta.ca", "start_time": t1}
        js7 = {"invite_email" : "eee@ualberta.ca", "invitee_email" : "fff@ualberta.ca", "start_time": t1}
        js8 = {"inviter_email" : "fff@ualberta.ca", "invitee_email" : "eee@ualberta.ca", "start_time": t5}
        js9 = {"invitee_email" : "fff@ualberta.ca", "start_time": t1}
        js10 = {"inviter_email" : "eee@ualberta.ca", "start_time": t1}
        js11 = {"inviter_email" : "fff@ualberta.ca", "invitee_email" : "eee@ualberta.ca"}
        r6 = requests.post(url2, js6)
        r7 = requests.post(url2, js7)
        r8 = requests.post(url2, js8)
        r9 = requests.post(url2, js9)
        r10 = requests.post(url2, js10)
        r11 = requests.post(url2, js11)

        url3 = '/getInvitationSent'
        
        js12 = {"inviter_email" : "eee@ualberta.ca"}
        js13 = {"inviter_email" : "fff@ualberta.ca"}
        js14 = {"inviter_email" : "no@ualberta.ca"}
        js15 = {"invite_email" : "eee@ualberta.ca"}
        js16 = {"inviter_email" : "a@ualberta.ca"}
        
        r12 = requests.post(url3, data = js12)
        r13 = requests.post(url3, data = js13)
        r14 = requests.post(url3, data = js14)
        r15 = requests.post(url3, data = js15)
        r16 = requests.post(url3, data = js16)
        self.assertEqual(r12.status_code, 200)
        self.assertEqual(r12.json()['status'], "success")
        self.assertEqual(r13.json()['status'], "success")
        # self.assertEqual(r14.json()['status'], "success")
        self.assertEqual(r15.json()['status'], "fail")
        self.assertEqual(r16.json()['status'], "fail")

