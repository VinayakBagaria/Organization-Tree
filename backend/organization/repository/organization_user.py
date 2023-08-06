from typing import List, Dict

from backend.singleton import Singleton
from ..models import OrganizationUser


class OrganizationUserRepository(metaclass=Singleton):
    class Meta:
        model = OrganizationUser

    def get_all_users(self) -> List[Dict]:
        return list(self.Meta.model.objects.all().values('id', 'first_name', 'last_name', 'image', 'designation',
                                                         'country_code', 'phone_number', 'email', 'manager_id'))

    def update_manager_for_user(self, source_user_id: int, target_user_id: int) -> int:
        try:
            updates_count = self.Meta.model.objects.filter(id=source_user_id).update(manager_id=target_user_id)
            return updates_count
        except Exception:
            return -1
