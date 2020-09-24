
from rest_framework import serializers
from .models import *

"""
All these serializers inherit the ModelSerializer and displays all the fields for all the models
"""

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"
        
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = "__all__"

class MemberOfGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memberofgroup
        fields = "__all__"

class IteminListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Iteminlist
        fields = "__all__"
        
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = "__all__"

class ShoppinglistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shoppinglists
        fields = "__all__"

class MembercontributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membercontribution
        fields = "__all__"


