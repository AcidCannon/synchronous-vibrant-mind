from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return render(request, 'mahjong/game.html')
    
def test(request):
    return render(request, 'mahjong/test.html')
