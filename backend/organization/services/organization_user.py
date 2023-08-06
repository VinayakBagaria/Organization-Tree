from typing import Optional

from backend.exception_handler import ExceptionCreator
from backend.singleton import Singleton
from ..repository.organization_user import OrganizationUserRepository


class OrganizationUserService(metaclass=Singleton):
    def __init__(self):
        self._repository = OrganizationUserRepository()

    def get_all_users(self):
        return self._repository.get_all_users()

    def update_manager_for_user(self, source_user_id: int, target_user_id: int) -> Optional:
        if source_user_id == target_user_id:
            raise ExceptionCreator(message='Cannot become manager of itself')

        row_update_count = self._repository.update_manager_for_user(source_user_id, target_user_id)
        if row_update_count == 0:
            raise ExceptionCreator(message='Source user not found')
        if row_update_count == -1:
            raise ExceptionCreator(message='Manager user not found')
