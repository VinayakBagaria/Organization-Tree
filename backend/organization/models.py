from django.db import models

from backend.models import BaseModel

DEFAULT_COUNTRY_CODE = '91'


class OrganizationUser(BaseModel):
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    image = models.URLField(max_length=512, null=False)
    designation = models.CharField(max_length=128, null=False, blank=False)
    country_code = models.CharField(max_length=5, null=True, blank=True, default=DEFAULT_COUNTRY_CODE)
    phone_number = models.CharField(max_length=16, null=True, blank=True)
    email = models.EmailField(max_length=254, null=True, blank=True)

    manager = models.ForeignKey('self', null=True, blank=True, default=None, on_delete=models.PROTECT)

    class Meta:
        db_table = 'organization_user'

    def __str__(self):
        return (self.first_name + ' ' + (self.last_name or '')).strip()

    @property
    def fullname(self):
        return (self.first_name + ' ' + (self.last_name or '')).strip()
