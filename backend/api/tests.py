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
        request = self.client
        url = '/addPlayer'
        r1 = request.post(url, {"name": "test1", "email" : "test1@ualberta.ca"})
        r2 = request.post(url, {"name": "test2", "email" : "test2@ualberta.ca"})
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r2.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")
        self.assertEqual(r2.json()['status'],"success")

    #test addInvitation
    def testAddInvitation(self):
        request = self.client
        url = '/addInvitation'
        r1 = request.post(url, {"inviter_email" : "test1@ualberta.ca", "invitee_email" : "test2@ualberta.ca", "start_time": "2020-11-1 12:00:00", "status":"PENDING"})
        r2 = request.post(url, {"inviter_email" : "test1@ualberta.ca", "invitee_email" : "test2@ualberta.ca", "start_time": "2020-11-1 12:00:00", "status":"FAILED"})
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r2.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")
        self.assertEqual(r2.json()['status'],"success")

    #test changeInvitationStatus
    def testChangeStatus(self):
        request = self.client
        url = '/changeInvitationStatus'
        r1 = request.post(url, {"invitation_id":1, "status":"ACCEPTED"})
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")
        

    #test addMeeting
    def testAddMeeting(self):
        request = self.client
        url = '/addMeeting'
        r1 = request.post(url, {"invitation_id":1})
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")

    #test addMeetingTime
    def testAddMeetingTime(self):
        request = self.client
        url = '/addMeetingTime'
        r1 = request.post(url, {"invitation_id":1, "name":"test1", "login_time":"2020-11-1 12:00:00","logout_time":"2020-11-1 12:30:00"})
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")

    #test sendNotification
    def testSendNotification(self):
        request = self.client
        url = '/sendNotification'
        r1 = request.post(url, {"invitation_id":1, "username":"test1", "content":"test"})
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")

    #test changeNotificationStatus
    def testChangeNotificationStatus(self):
        request = self.client
        url = '/changeNotificationStatus'
        r1 = request.post(url, {"notification_id":1, "status":"READ"})
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")

    #test getInvitationSent
    def testGetInvitationSent(self):
        request = self.client
        url = '/getInvitationSent?p=test1@ualberta.ca'
        r1 = request.get(url)
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")
        self.assertEqual(r1.json()['invitations'][0]['inviter'], "test1")
        self.assertEqual(r1.json()['invitations'][0]['state'], "PENDING")


    #test getInvitationReceived
    def testGetInvitationReceived(self):
        request = self.client
        url = '/getInvitationReceived?p=test2@ualberta.ca'
        r1 = request.get(url)
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")
        self.assertEqual(r1.json()['invitations'][0]['invitee'], "test2")
        self.assertEqual(r1.json()['invitations'][0]['state'], "PENDING")

    #test getNotification
    def testGetNotification(self):
        request = self.client
        url = '/getNotification?p=test1@ualberta.ca'
        r1 = request.get(url)
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")
        self.assertEqual(r1.json()['notifications'][0]['player'], "test1")

    #test getMeetingHistory
    def testGetMeetingHistory(self):
        request = self.client
        url = '/getMeetingHistory?p=test1@ualberta.ca'
        r1 = request.get(url)
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")
        self.assertEqual(len(r1.json()['history']), 0)

    #test getUpcomingEvent
    def testGetUpcomingEvent(self):
        request = self.client
        url = '/getUpcomingEvent?p=test1@ualberta.ca'
        r1 = request.get(url)
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['status'],"success")
        self.assertEqual(len(r1.json()['upcoming']), 0)

    #test isTimeConflict
    def testIsTimeConflict(self):
        request = self.client
        url = '/isTimeConflict'
        r1 = request.post(url, {"name":"test1","email":"test1@ualberta.ca","start_time":"202011-1 21:00:00"})
        self.assertEqual(r1.status_code, 200)

    #test checkPlayerExist
    def testCheckPlayerExist(self):
        request = self.client
        url = '/checkPlayerExist'
        r1 = request.post(url, {"email":"test1@ualberta.ca"})
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.json()['exist'], True)

    #test getAllPlayer
    def testGetAllPlayer(self):
        request = self.client
        url = '/getAllPlayer'
        r1 = request.get(url)
        self.assertEqual(r1.status_code, 200)
    #     self.assertEqual(r1.json()['status'],"fail")
