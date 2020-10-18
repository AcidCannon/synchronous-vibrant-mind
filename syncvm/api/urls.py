from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("test", views.test),
    path("addPlayer", views.addPlayer),
    path("sendInvitation", views.sendInvitation),
    path("getInvitationSent", views.getInvitationSent)
]

