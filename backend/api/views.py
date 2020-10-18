from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
import json
import datetime 
from .models import Invitation, Meeting, Notification, Player
from .serializers import InvitationSerializer, MeetingSerializer, NotificationSerializer, PlayerSerializer
from django.template import loader
from django.http import HttpResponse
from django.db.models import Q

# Create your views here.
@api_view(["GET"])
def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())

@api_view(["POST"])
def addPlayer(request):
    try:
        name = request.data['name']
        email = request.data['email']
        player = Player.objects.filter(email = email)
        if(not player):
            p = Player(name = name, email = email)
            p.save()
    except Exception as e:
        json = {
            'status': 'fail',
            'msg':str(e).strip("'")
        }
        return JsonResponse(json, safe=False)
    else:
        return JsonResponse({'status':'success'}, safe=False)

@api_view(["POST"])
def sendInvitation(request):
    try:
        inviter_email = request.data['inviter_email']
        invitee_email = request.data['invitee_email']
        start_time = request.data['start_time']
        inviter = Player.objects.get(email = inviter_email)
        invitee = Player.objects.get(email = invitee_email)

        invitation = Invitation(state="PENDING", inviter = inviter, invitee = invitee, start_time = start_time)
        invitation.save()
    except Exception as e:
        json = {
            'status' : 'fail',
            'msg' : str(e).strip("'")
        }
        return JsonResponse(json, safe=False)
    else:
        json = {
            'status' : 'success',
            'invitation_id' : invitation.id
        }
        return JsonResponse(json, safe=False)

@api_view(["POST"])
def getInvitationSent(request):
    try:
        inviter_email = request.data['inviter_email']
        inviter = Player.objects.get(email = inviter_email)
        invitations = Invitation.objects.filter(inviter = inviter)
    except Exception as e:
        json = {
            'status': 'fail',
            'msg' : str(e).strip("'")
        }
        return JsonResponse(json, safe=False)
    else:
        serializer = InvitationSerializer(invitations, many=True)
        json = {
            'status':'success',
            'invitations':serializer.data
        }
        return JsonResponse(json, safe=False)

@api_view(["POST"])
def getInvitationReceived(request):
    try:
        invitee_email = request.data['invitee_email']
        invitee = Player.objects.get(email = invitee_email)
        invitations = Invitation.objects.filter(invitee = invitee)
    except Exception as e:
        json = {
            'status': 'fail',
            'msg' : str(e).strip("'")
        }
        return JsonResponse(json, safe=False)
    else:
        serializer = InvitationSerializer(invitations, many=True)
        json = {
            'status':'success',
            'invitations':serializer.data
        }
        return JsonResponse(json, safe=False)

@api_view(["POST"])
def sendNotification(request):
    try:
        player_email = request.data['player_email']
        invitation_id = request.data['invitation_id']
        content = request.data['content']
        player = Player.objects.get(email = player_email)
        invitation = Invitation.objects.get(id = invitation_id)
        notification = Notification(state = "UNREAD", content = content, player = player, invitation = invitation)
        notification.save()
    except Exception as e:
        json = {
            'status': 'fail',
            'msg' : str(e).strip("'")
        }
        return JsonResponse(json, safe=False)
    else:
        json = {
            'status' : 'success',
            'notification_id' : notification.id
        }
        return JsonResponse(json, safe=False)

@api_view(["POST"])
def getNotification(request):
    try:
        player_email = request.data['player_email']
        player = Player.objects.get(email = player_email)
        notifications = Notification.objects.filter(player = player)
    except Exception as e:
        json = {
            'status': 'fail',
            'msg' : str(e).strip("'")
        }
        return JsonResponse(json, safe=False)
    else:
        serializer = NotificationSerializer(notifications, many=True)
        json = {
            'status':'success',
            'notifications':serializer.data
        }
        return JsonResponse(json, safe=False)


@api_view(["POST"])
def getMeetingHistory(request):
    try:
        player_email = request.data['player_email']
        player = Player.objects.get(email = player_email)
        history = Meeting.objects.filter(Q(player1=player) | Q(player2=player))
    except Exception as e:
        json = {
            'status': 'fail',
            'msg' : str(e).strip("'")
        }
        return JsonResponse(json, safe=False)
    else:
        mylist = []
        json = {
            'status' : 'success',
            'history' : mylist
        }
        for each in history:
            eachjson = {}
            eachjson['id'] = each.id
            eachjson['start_time'] = each.start_time
            if(each.player1 == player):
                eachjson['player'] = each.player2.name
                eachjson['p_login'] = each.player2_login_time
                eachjson['p_logout'] = each.player2_logout_time
                eachjson['my_login'] = each.player1_login_time
                eachjson['my_logout'] = each.player1_logout_time
            else:
                eachjson['player'] = each.player1.name
                eachjson['p_login'] = each.player1_login_time
                eachjson['p_logout'] = each.player1_logout_time
                eachjson['my_login'] = each.player2_login_time
                eachjson['my_logout'] = each.player2_logout_time
            mylist.append(eachjson)
        return JsonResponse(json, safe=False)


@api_view(["POST"])
def getUpcomingEvent(request):
    try:
        player_email = request.data['player_email']
        player = Player.objects.get(email = player_email)
        query = Q(inviter = player)
        query.add(Q(invitee = player), Q.OR)
        query.add(Q(state = "ACCEPTED"), Q.AND)
        now = datetime.datetime.now()
        query.add(Q(start_time__gte = now), Q.AND)
        invitations = Invitation.objects.filter(query)
    except Exception as e:
        json = {
            'status': 'fail',
            'msg' : str(e).strip("'")
        }
        return JsonResponse(json, safe=False)
    else:
        mylist = []
        json = {
            'status' : 'success',
            'upcoming' : mylist
        }
        for each in invitations:
            eachjson = {}
            eachjson['id'] = each.id
            eachjson['start_time'] = each.start_time
            if(each.inviter == player):
                eachjson['player'] = each.invitee.name
            else:
                eachjson['player'] = each.inviter.name
            mylist.append(eachjson)
        return JsonResponse(json, safe=False)

@api_view(["POST"])
def changeInvitationStatus(request):
    try:
        invitation_id = request.data['invitation_id']
        status = request.data['status']
        if(not(status == 'ACCEPTED' or status == 'DECLINED' or status == 'PENDING' or status == 'FAILED')):
            json = {
                'status': 'fail',
                'msg' : "Invalid status changed"
            }
            return JsonResponse(json, safe=False)
        invitation = Invitation.objects.get(id = invitation_id)
        invitation.state = status
        invitation.save(update_fields=['state'])
    except Exception as e:
        json = {
            'status': 'fail',
            'msg' : str(e).strip("'")
        }
        return JsonResponse(json, safe=False)
    else:
        return JsonResponse({'status':'success'}, safe=False)


@api_view(["POST"])
def changeNotificationStatus(request):
    try:
        notification_id = request.data['notification_id']
        status = request.data['status']
        if(not(status == 'READ' or status == 'UNREAD')):
            json = {
                'status': 'fail',
                'msg' : "Invalid status changed"
            }
            return JsonResponse(json, safe=False)
        notification = Notification.objects.get(id = notification_id)
        notification.state = status
        notification.save(update_fields=['state'])
    except Exception as e:
        json = {
            'status': 'fail',
            'msg' : str(e).strip("'")
        }
        return JsonResponse(json, safe=False)
    else:
        return JsonResponse({'status':'success'}, safe=False)