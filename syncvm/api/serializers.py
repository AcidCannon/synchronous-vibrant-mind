from rest_framework import serializers
from . import models
from .models import Invitation, Meeting, Notification, Player

# class RecordSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = models.Record
#             fields = ['uid', 'name','age', 'sex']

class InvitationSerializer(serializers.ModelSerializer):
    inviter = serializers.SlugRelatedField(read_only=False, slug_field="name", queryset=Player.objects.all())
    invitee = serializers.SlugRelatedField(read_only=False, slug_field="name", queryset=Player.objects.all())
    class Meta:
        model = models.Invitation
        fields = '__all__'
        # fields = ['state', 'inviter','invitee', 'start_time']

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Meeting
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Player
        fields = '__all__'
        # fields = ['name','email']