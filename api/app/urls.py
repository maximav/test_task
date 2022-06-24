"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import permissions, routers
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from tasks.views import FileModelViewSet
from users.views import UserViewSet, MeViewSet, LoginView, LogoutView, NotificationView


schema_view = get_schema_view(
    openapi.Info(title="App API", default_version='v1',),
    public=True,
    permission_classes=(permissions.AllowAny,),
    url=settings.APP_API_HOST
)

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'files', FileModelViewSet)

urlpatterns = []

urlpatterns += [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls))]

urlpatterns += [
    path(r'api/v1/me/', ensure_csrf_cookie(MeViewSet.as_view({'get': 'retrieve'}))),

    path(r'api/auth/login/', LoginView.as_view()),
    path(r'api/auth/logout/', LogoutView.as_view()),
    path(r'api/notifications/', NotificationView.as_view()),
    re_path(
        r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0),
        name='schema-json',
    ),
    path(
        r'swagger/',
        schema_view.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui',
    ),
    path(r'redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc')]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += staticfiles_urlpatterns()
