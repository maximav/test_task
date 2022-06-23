from django.conf import settings
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.request import Request
from rest_framework.response import Response


class BasePagination(PageNumberPagination):
    page_size: int
    page_sizes = settings.APP_PAGE_SIZES

    def get_page_size(self, request: Request) -> int:
        try:
            page_size = int(request.query_params.get('pageSize', self.page_sizes[0]))
        except ValueError:
            raise ValidationError('Page size must be string')

        if page_size not in self.page_sizes:
            raise ValidationError('Page size %s unavailable' % page_size)

        self.page_size = page_size
        return page_size

    def get_paginated_response(self, data):
        return Response(
            {
                'page_size': self.page_size,
                'count': self.page.paginator.count,
                'results': data,
            }
        )
