from django.db import models

# Create your models here.
class Record(models.Model):
    uid = models.TextField()
    col1 = models.TextField()
    col2 = models.TextField()
    col3 = models.TextField()
