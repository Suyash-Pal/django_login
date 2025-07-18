from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('send-otp/', views.send_otp),
    path('verify-otp/', views.verify_otp),
    path('details/', views.show_details_form),
    path('submit-details/', views.submit_details),
]