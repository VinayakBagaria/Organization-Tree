from datetime import datetime

from django.db import models, transaction


class SoftDeleteQuerySet(models.QuerySet):
    @transaction.atomic
    def delete(self):
        self.update(deleted=True, updated_on=datetime.now())

    def hard_delete(self):
        # TODO: Add logger service here
        super(SoftDeleteQuerySet, self).delete()


class BaseManager(models.Manager):
    def __init__(self, *args, **kwargs):
        self.with_deleted = kwargs.pop('deleted', False)
        super(BaseManager, self).__init__(*args, **kwargs)

    def get_queryset(self):
        qs = SoftDeleteQuerySet(self.model)
        if self.with_deleted:
            return qs
        else:
            return qs.filter(deleted=False)


class BaseModel(models.Model):
    deleted = models.BooleanField(default=False, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_on = models.DateTimeField(auto_now=True, null=True, blank=True)
    objects = BaseManager()
    all_objects = BaseManager(deleted=True)

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        self.updated_on = datetime.now()
        self.deleted = True
        self.save()

    def hard_delete(self, *args, **kwargs):
        # TODO: Add logger service here
        super(BaseModel, self).delete(*args, **kwargs)
