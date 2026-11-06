from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home.index'),
    path('about/', views.about, name='home.about'),
    path('products/', views.products, name='home.products'),
    path('projects/', views.projects, name='home.projects'),
]