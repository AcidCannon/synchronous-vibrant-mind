from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
import json
from .models import Record
from .serializers import RecordSerializer
from django.template import loader
from django.http import HttpResponse

# Create your views here.
@api_view(["GET"])
def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())
