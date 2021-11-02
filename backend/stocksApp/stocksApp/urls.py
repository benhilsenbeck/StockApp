from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from users import views
from rest_framework_simplejwt import views as jwt_views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/obtain', views.ObtainTokenPairView.as_view(), name='token_create'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('userCreateAccount', views.userCreateAccountView.as_view(), name='userCreateAccount'),
    path('addStocks', views.addStocksView.as_view(), name='addStocks'),
    path('searchStocks', views.searchStocksView.as_view(), name='searchStocks')
    # path('token/check', views.checkToken.as_view(), name="checkToken"),
]