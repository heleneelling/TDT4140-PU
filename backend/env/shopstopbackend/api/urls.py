from django.urls import path, include
from api import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserView)
router.register(r'groups', views.GroupView)
router.register(r'memberofgroup', views.MemberofgroupView)
router.register(r'items', views.ItemView)
router.register(r'iteminlist', views.IteminListView)
router.register(r'shoppinglists', views.ShoppinglistView)
router.register(r'membercontributions', views.MembercontributionView)


urlpatterns = [
   path('', include(router.urls)),
]