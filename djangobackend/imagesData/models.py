from django.db import models


# Create your models here.
def upload_to(instance,filename):
    return 'uploads/{filename}'.format(filename=filename)

class ImageDataTo(models.Model):
    image_url = models.ImageField(upload_to=upload_to)
    from_language = models.CharField("From Language", max_length=100)
    to_language = models.CharField("To Language", max_length=100)
    def __str__(self):
        return self.from_language + self.to_language

