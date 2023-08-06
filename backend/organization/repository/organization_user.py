from backend.singleton import Singleton
from ..models import OrganizationUser


class OrganizationUserRepository(metaclass=Singleton):
    class Meta:
        model = OrganizationUser

