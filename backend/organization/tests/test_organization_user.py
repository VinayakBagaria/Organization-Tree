from django.test import TestCase

from backend.exception_handler import ExceptionCreator
from ..models import OrganizationUser
from ..services.organization_user import OrganizationUserService


class OrganizationUserTestCase(TestCase):
    def setUp(self):
        self._manager = OrganizationUser.objects.create(first_name='Mark', designation='CTO')
        self._senior_employee = OrganizationUser.objects.create(first_name='John', designation='SSE')
        self._employee = OrganizationUser.objects.create(first_name='Kirk', designation='Engineer',
                                                         manager_id=self._manager.id)
        self._service = OrganizationUserService()

    def test_get_all_users(self):
        result = self._service.get_all_users()
        self.assertEqual(len(result), OrganizationUser.objects.count())
        for user in result:
            self.assertEqual(OrganizationUser.objects.filter(id=user['id'], manager_id=user['manager_id']).count(), 1)

    def test_invalid_update_user(self):
        try:
            self._service.update_manager_for_user(OrganizationUser.objects.count() + 100, self._senior_employee.id)
        except Exception as e:
            assert isinstance(e, ExceptionCreator)
            assert e.message == 'Source user not found'
            return

        assert False

    def test_self_as_manager(self):
        try:
            self._service.update_manager_for_user(self._employee.id, self._employee.id)
        except Exception as e:
            assert isinstance(e, ExceptionCreator)
            assert e.message == 'Cannot become manager of itself'
            return

    def test_valid_update_user_manager(self):
        count_qs = OrganizationUser.objects.filter(id=self._employee.id, manager_id=self._senior_employee.id)
        self.assertEqual(count_qs.count(), 0)
        self._service.update_manager_for_user(self._employee.id, self._senior_employee.id)
        self.assertEqual(count_qs.count(), 1)
