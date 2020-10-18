from django.db import models

# Create your models here.
# class Record(models.Model):
#     uid = models.TextField()
#     col1 = models.TextField()
#     col2 = models.TextField()
#     col3 = models.TextField()

class Invitation(models.Model):
    Invitation_State = (
        ("ACCEPTED", "Accepted"),
        ("DECLINED", "Declined"),
        ("PENDING", "Pending"),
        ("FAILED", "Failed"),
    )
    state = models.CharField(max_length=8, choices=Invitation_State)
    inviter = models.ForeignKey("Player", on_delete=models.CASCADE, related_name = "inviter")
    invitee = models.ForeignKey("Player", on_delete=models.CASCADE, related_name = "invitee")
    start_time = models.DateTimeField()

class Meeting(models.Model):
    start_time = models.DateTimeField()
    player1 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name = "player1")
    player1_login_time = models.DateTimeField()
    player1_logout_time = models.DateTimeField()
    player2 = models.ForeignKey("Player", on_delete=models.CASCADE, related_name = "player2")
    player2_login_time = models.DateTimeField()
    player2_logout_time = models.DateTimeField()

class Notification(models.Model):
    Notification_State = (
        ("READ", "Read"),
        ("UNREAD", "Unread"),
    )
    state = models.CharField(max_length=6, choices=Notification_State)
    content = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
    player = models.ForeignKey("Player", on_delete=models.CASCADE)
    invitation = models.ForeignKey("Invitation", on_delete=models.CASCADE)

class Player(models.Model):
    name = models.TextField()
    email = models.EmailField()
    # invitations_sent = models.ManyToManyField("Invitation", related_name = "sent")
    # invitation_received = models.ManyToManyField("Invitation", related_name = "received")
    # upcoming_meetings = models.ManyToManyField("Meeting", related_name = "upcoming")
    # meetings_history = models.ManyToManyField("Meeting", related_name = "history")

