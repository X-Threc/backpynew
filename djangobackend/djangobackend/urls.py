from django.contrib import admin
from django.urls import path
from imagesData import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'^api/Image/$', views.Image_request),
]
