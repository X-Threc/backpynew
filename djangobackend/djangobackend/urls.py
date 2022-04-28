from django.contrib import admin
from django.urls import path, re_path
from imagesData import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/Image/$', views.ImageView.as_view(), name="image_post"),
]
