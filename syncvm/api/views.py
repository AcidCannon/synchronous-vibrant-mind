from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
import json
import datetime 
from .models import Invitation, Meeting, Notification, Player
from .serializers import InvitationSerializer, MeetingSerializer, NotificationSerializer, PlayerSerializer
from django.template import loader
from django.http import HttpResponse

# Create your views here.
@api_view(["GET"])
def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())

def test(request):
    # p1 = Player(name = "Felix", email = "zh@ualberta.ca")
    # p1.save()
    # p2 = Player(name = "Who", email = "who@ualberta.ca")
    # p2.save()
    inviter = Player.objects.filter(name = "who")
    # invitee = Player.objects.get(name = "Felix")
    # d = datetime.datetime(2011, 10, 1, 15, 26)
    # i = Invitation(state = 2, inviter = inviter, invitee = invitee, start_time = d)
    # i.save()
    # dataModel = Player.objects.get(id=1)
    # invit = dataModel.invitations_sent
    if(inviter):
        serializer = PlayerSerializer(inviter[0])
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({}, safe=False)

@api_view(["POST"])
def addPlayer(request):
    try:
        name = request.data['name']
        email = request.data['email']
    except Exception as e:
        json = {
            'status': 'fail',
            'msg':str(e)
        }
        return JsonResponse(json, safe=False)
    else:
        player = Player.objects.filter(email = email)
        if(not player):
            p = Player(name = name, email = email)
            p.save()
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
        return JsonResponse({'status':'success'}, safe=False)

@api_view(["POST"])
def getInvitationSent(request):
    try:
        inviter_email = request.data['inviter_email']
        inviter = Player.objects.get(email = inviter_email)
        invitations = Invitation.objects.filter(inviter = inviter)
    except Exception as e:
        json = {
            'status': 'fail',
            'msg' : str(e)
        }
        return JsonResponse(json, safe=False)
    else:
        # for each in invitations:
        #     name = each.inviter.name
        #     serializer = InvitationSerializer(each)
        #     # serializer.data['inviter'] = name
        #     returnList.append(serializer.data)
        
        serializer = InvitationSerializer(invitations, many=True)
        json = {
            'status':'success',
            'invations':serializer.data
        }
        return JsonResponse(json, safe=False)
    # inviter_email = request.data['inviter_email']
    # inviter = Player.objects.get(email = inviter_email)
    # invitations = Invitation.objects.filter(inviter = inviter)
    # return JsonResponse({}, safe=False)
