from django.db import models

# Create your models here.

class ImageDataTo(models.Model):
    image_url =models.ImageField(upload_to ='uploads/')
    from_language = models.CharField("From Language", max_length=100)
    to_language = models.CharField("To Language", max_length=100)

