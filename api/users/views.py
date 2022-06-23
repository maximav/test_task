from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from users.pagination import UsersPagination
from users.serializers import (
    LoginSerializer,
    MeSerializer,
    UserListSerializer,
    UserSerializer,
)


class LoginView(APIView):

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def post(self, request, *args, **kwargs):
        request_serializer = LoginSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)
        try:
            user: User = User.objects.get(
                username=request_serializer.validated_data['username']
            )
            if user.check_password(request_serializer.validated_data['password']):
                login(request, user)
                response_serializer = MeSerializer(instance=user)
                response = Response(response_serializer.data)
                return response
            else:
                raise AuthenticationFailed('Invalid credentials')
        except User.DoesNotExist:
            raise AuthenticationFailed('Invalid credentials')


class LogoutView(APIView):
    @method_decorator(never_cache)
    def post(self, request, *args, **kwargs):
        logout(request)
        response = Response()
        return response


class MeViewSet(ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = MeSerializer

    def get_object(self) -> 'User':
        return self.request.user


class NotificationView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        if user:
            return Response(headers={'X-Accel-Redirect': f'/ws/{user.id}'})
        else:
            raise NotAuthenticated('Invalid credentials')


class UserViewSet(ModelViewSet):
    queryset = User.objects.filter(is_staff=False).order_by('-id')
    permission_classes = (IsAdminUser,)
    serializer_class = UserSerializer
    pagination_class = UsersPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        else:
            return UserSerializer

