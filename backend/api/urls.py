from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("addPlayer", views.addPlayer),
    path("addInvitation", views.addInvitation),
    path("getInvitationSent", views.getInvitationSent),
    path("getInvitationReceived",views.getInvitationReceived),
    path("sendNotification", views.sendNotification),
    path("getNotification", views.getNotification),
    path("getMeetingHistory", views.getMeetingHistory),
    path("getUpcomingEvent", views.getUpcomingEvent),
    path("changeInvitationStatus", views.changeInvitationStatus),
    path("changeNotificationStatus", views.changeNotificationStatus),
    path("isTimeConflict", views.isTimeConflict),
    path("getId", views.getId),
    path("getAllPlayer", views.getAllPlayer),
    path("checkPlayerExist", views.checkPlayerExist),
    path("addMeeting", views.addMeeting),
    path("addMeetingTime", views.addMeetingTime),
    path("addMeetingLoginTime", views.addMeetingLoginTime),
    path("addMeetingLogoutTime", views.addMeetingLogoutTime)
]