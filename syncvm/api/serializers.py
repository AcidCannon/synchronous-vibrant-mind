from rest_framework import serializers
from . import models

class RecordSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Record
            fields = ['uid', 'name','age', 'sex']
