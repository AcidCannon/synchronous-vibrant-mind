from django.contrib import admin
from .models import Record

# Register your models here.
class RequestedAdmin(admin.ModelAdmin):
        readonly_fields = ('uid',)


admin.site.register(Record, RequestedAdmin)
