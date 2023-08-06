from django.urls import path

from . import views

urlpatterns = [
    path('', views.GetAllUsersView.as_view()),
    path('update_manager/<int:source_user_id>/<int:target_user_id>', views.UpdateManagerForUserView.as_view()),
]
