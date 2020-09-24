from django.shortcuts import render
from rest_framework import viewsets
from django.views.generic import TemplateView
from .serializers import *
from .models import *
from rest_framework import permissions
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import renderers
from rest_framework import generics



class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Users.objects.all()

    def get_queryset(self):
        """
        Optionally restricts the returned user
        by filtering against a `email` query parameter in the URL.
        """
        queryset = Users.objects.all()
        email = self.request.query_params.get('email', None)
        if email is not None:
            queryset = queryset.filter(email=email)
        return queryset

class GroupView(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Groups.objects.all()
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Optionally restricts the returned  group
        by filtering against a `groupid` query parameter in the URL.
        """
        queryset = Groups.objects.all()
        groupid = self.request.query_params.get('groupid', None)
        if groupid is not None:
            queryset = queryset.filter(groupid=groupid)
        return queryset


class MemberofgroupView(viewsets.ModelViewSet):
    serializer_class = MemberOfGroupSerializer
    queryset = Memberofgroup.objects.all()
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Optionally restricts the returned member of a group,
        by filtering against a `userid` or `groupid` query parameter in the URL.
        """
        queryset = Memberofgroup.objects.all()
        userid = self.request.query_params.get('userid', None)
        groupid = self.request.query_params.get('groupid', None)
        if userid is not None and groupid is not None:
            queryset = queryset.filter(userid=userid)
            queryset = queryset.filter(groupid=groupid)
        elif userid is not None:
            queryset = queryset.filter(userid=userid)
        elif groupid is not None:
            queryset = queryset.filter(groupid=groupid)
        return queryset

class ItemView(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Items.objects.all()
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Optionally restricts the returned item,
        by filtering against a `item` query parameter in the URL.
        """
        queryset = Items.objects.all()
        itemid = self.request.query_params.get('ItemID', None)
        if itemid is not None:
            queryset = queryset.filter(itemid=itemid)
        return queryset

class IteminListView(viewsets.ModelViewSet):
    serializer_class = IteminListSerializer
    queryset = Iteminlist.objects.all()
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Optionally restricts the returned item in list
        by filtering against a `itemid` or `listid` query parameter in the URL.
        """
        queryset = Iteminlist.objects.all()
        listid = self.request.query_params.get('ListID', None)
        itemid = self.request.query_params.get('ItemID', None)
        if listid is not None and itemid is not None:
            queryset = queryset.filter(itemid=itemid)
            queryset = queryset.filter(listid=listid)
        elif itemid is not None:
            queryset = queryset.filter(itemid=itemid)
        elif listid is not None:
            queryset = queryset.filter(listid=listid)
        return queryset

class ShoppinglistView(viewsets.ModelViewSet):
    serializer_class = ShoppinglistSerializer
    queryset = Shoppinglists.objects.all()
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Optionally restricts the returned shoppinhlist,
        by filtering against a `group` query parameter in the URL.
        """
        queryset = Shoppinglists.objects.all()
        groupid = self.request.query_params.get('GroupID', None)
        if groupid is not None:
            queryset = queryset.filter(groupid=groupid)
        return queryset

class MembercontributionView(viewsets.ModelViewSet):
    serializer_class = MembercontributionSerializer
    queryset = Membercontribution.objects.all()
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Optionally restricts the returned membercontribution to a given user,
        by filtering against a `userid` or `groupid` query parameter in the URL.
        """
        queryset = Membercontribution.objects.all()
        groupid = self.request.query_params.get('GroupID', None)
        userid = self.request.query_params.get('UserID', None)
        if groupid is not None and userid is not None:
            queryset = queryset.filter(userid=userid)
            queryset = queryset.filter(groupid=groupid)
        elif userid is not None:
            queryset = queryset.filter(userid=userid)
        elif groupid is not None:
            queryset = queryset.filter(groupid=groupid)
        return queryset
