import json

from django.http import HttpResponse

from .services.organization_user import OrganizationUserService


def get_all_users_view(request):
    service = OrganizationUserService()
    result = service.get_all_users()

    response_data = dict(data=result, msg='Fetched succesfully')
    return HttpResponse(json.dumps(response_data), status=200, content_type="application/json")
