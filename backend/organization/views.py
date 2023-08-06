import json

from django.http import HttpResponse
from django.views import View

from backend.exception_handler import ExceptionCreator
from .services.organization_user import OrganizationUserService


class GetAllUsersView(View):
    _service = OrganizationUserService()

    def get(self, request):
        result = self._service.get_all_users()
        response_data = dict(data=result, msg='Fetched succesfully')
        return HttpResponse(json.dumps(response_data), status=200, content_type="application/json")


class UpdateManagerForUserView(View):
    _service = OrganizationUserService()

    def put(self, request, source_user_id, target_user_id):
        try:
            self._service.update_manager_for_user(source_user_id, target_user_id)
        except ExceptionCreator as e:
            error_data = dict(msg=e.message)
            return HttpResponse(json.dumps(error_data), status=400, content_type="application/json")

        response_data = dict(msg='Updated succesfully')
        return HttpResponse(json.dumps(response_data), status=204, content_type="application/json")
