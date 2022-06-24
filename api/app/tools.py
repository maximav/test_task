from app_lib.classes.notification import Notification
from app_lib.enums import NotificationType
from app_lib.services.notification_service import NotificationService
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.utils import timezone


def get_all_logged_in_users():
    # Query all non-expired sessions
    # use timezone.now() instead of datetime.now() in latest versions of Django
    sessions = Session.objects.filter(expire_date__gte=timezone.now())
    uid_list = []

    # Build a list of user ids from that query
    for session in sessions:
        data = session.get_decoded()
        uid_list.append(data.get('_auth_user_id', None))

    # Query all logged in users based on id list
    return User.objects.filter(id__in=uid_list)


def send_to_all(data: dict, notifications: 'NotificationService', notification_type: 'NotificationType'):
    users = get_all_logged_in_users()
    for user in users:
        message = Notification(
            user_id=user.pk,
            payload=data,
            type=notification_type
        )
        notifications.send(message)
