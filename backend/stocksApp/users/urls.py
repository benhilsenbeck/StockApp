from django.conf.urls import url
from users import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)