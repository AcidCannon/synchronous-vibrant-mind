from django.db import models

# Create your models here.
class Record(models.Model):
    uid = models.TextField()
    col1 = models.TextField()
    col2 = models.TextField()
    col3 = models.TextField()

class Invitation(model.Model):
    Invitation_State = (
        (0, "Accepted"),
        (1, "Declined"),
        (2, "Pending"),
        (3, "Failed"),
    )
    state = models.SmallIntegerField(choices=Invitation_State)
    inviter = models.ForeignKey("Player", on_delete=models.CASCADE, related_name = "inviter")
    invitee = models.ForeignKey("Player", on_delete=models.CASCADE, related_name = "invitee")
    start_time = models.DateTimeField()
    meeting = models.OneToOneField("Meeting", on_delete=models.CASCADE)

class Meeting(model.Model):
    start_time = models.DateTimeField()
    player1 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name = "player1")
    player1_login_time = models.DateTimeField()
    player1_logout_time = models.DateTimeField()
    player2_name = models.ForeignKey("Player", on_delete=models.CASCADE, related_name = "player2")
    player2_login_time = models.DateTimeField()
    player2_logout_time = models.DateTimeField()

class Notification(model.Model):
    Notification_State = (
        (0, "Read"),
        (1, "Unread"),
    )
    state = models.SmallIntegerField(choices=Notification_State)
    content = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
    player = models.ForeignKey("Player", on_delete=models.CASCADE)
    invitation = models.ForeignKey("Invitation", on_delete=models.CASCADE)

class Player(models.Model):
    name = models.TextField()
    email = model.EmailField()
    invitations_sent = models.ManyToManyField("Invitation", related_name = "sent")
    invitation_received = models.ManyToManyField("Invitation", related_name = "received")
    upcoming_meetings = models.ManyToManyField("Meeting", related_name = "upcoming")
    meetings_history = models.ManyToManyField("Meeting", related_name = "history")

