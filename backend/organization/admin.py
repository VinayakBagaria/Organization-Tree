from django.contrib import admin
from .models import OrganizationUser

@admin.register(OrganizationUser)
class OrganizationUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'designation', 'people_count')

    def people_count(self, instance):
        return OrganizationUser.objects.filter(manager_id=instance.id).count()

    def has_change_permission(self, request, obj=None) -> bool:
        return False

    def has_delete_permission(self, request, obj=None) -> bool:
        return False

    def has_add_permission(self, request) -> bool:
        return False