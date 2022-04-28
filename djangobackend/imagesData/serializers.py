from rest_framework import serializers
from .models import ImageDataTo


class ImageDataSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = ImageDataTo
        fields = ('pk', 'image_url', 'from_language', 'to_language')

