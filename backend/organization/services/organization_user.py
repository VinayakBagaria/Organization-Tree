from backend.singleton import Singleton
from ..repository.organization_user import OrganizationUserRepository


class OrganizationUserService(metaclass=Singleton):
    def __str__(self):
        self._repository = OrganizationUserRepository

    def get_all_users(self):
        return []
