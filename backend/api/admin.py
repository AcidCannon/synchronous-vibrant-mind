from django.contrib import admin
from .models import Invitation, Meeting, Notification, Player

# Register your models here.
# class RequestedAdmin(admin.ModelAdmin):
#         readonly_fields = ('uid',)


# admin.site.register(Record, RequestedAdmin)
admin.site.register(Invitation)
admin.site.register(Meeting)
admin.site.register(Notification)
admin.site.register(Player)
