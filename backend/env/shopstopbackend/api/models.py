from django.db import models


"""
These models are made by the `python manage.py inspectdb` command. It shows all the information about the entities in the database
"""

class Groups(models.Model):
    groupid = models.AutoField(db_column='GroupID', primary_key=True)  # Field name made lowercase.
    adminid = models.ForeignKey('Users', models.DO_NOTHING, db_column='AdminID')  # Field name made lowercase.
    groupname = models.CharField(db_column='GroupName', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Groups'
        unique_together = (('groupid', 'adminid'),('adminid', 'groupname'),)

    def __str__(self):
        return self.groupname



class Iteminlist(models.Model):
    listid = models.ForeignKey('Shoppinglists', models.DO_NOTHING, db_column='ListID')  # Field name made lowercase.
    itemid = models.ForeignKey('Items', models.DO_NOTHING, db_column='ItemID')  # Field name made lowercase.
    ischecked = models.IntegerField(db_column='IsChecked')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ItemInList'
        unique_together = (('listid', 'itemid'),)

    def __str__(self):
        return "Listid: " + str(self.listid) + "| Itemid: " + str(self.itemid)



class Items(models.Model):
    itemid = models.AutoField(db_column='ItemID', primary_key=True)  # Field name made lowercase.
    itemname = models.CharField(db_column='ItemName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    price = models.IntegerField(db_column='Price', blank=True, null=True)  # Field name made lowercase.
    imagepath = models.CharField(db_column='ImagePath', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Items'

    def __str__(self):
        return self.itemname



class Memberofgroup(models.Model):
    userid = models.ForeignKey('Users', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    groupid = models.ForeignKey(Groups, models.DO_NOTHING, db_column='GroupID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'MemberOfGroup'
        unique_together = (('userid', 'groupid'),)

    def __str__(self):
        return "User: " + str(self.userid) +", Group: " + str(self.groupid)



class Shoppinglists(models.Model):
    listid = models.AutoField(db_column='ListID', primary_key=True)  # Field name made lowercase.
    groupid = models.ForeignKey(Groups, models.DO_NOTHING, db_column='GroupID')  # Field name made lowercase.
    listname = models.CharField(db_column='ListName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    iscomplete = models.IntegerField(db_column='IsComplete')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ShoppingLists'
        unique_together = (('groupid', 'listid'),)

    def __str__(self):
        return "Group: " + str(self.groupid) + " | Listname: " + self.listname



class Users(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True)  # Field name made lowercase.
    username = models.CharField(db_column='Username', max_length=255)  # Field name made lowercase.
    email = models.CharField(db_column='Email', unique=True, max_length=255)  # Field name made lowercase.
    avatar = models.CharField(db_column='Avatar', max_length=255, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=255)  # Field name made lowercase.
    age = models.IntegerField(db_column="Age")
    phone = models.IntegerField(db_column="Phone")

    class Meta:
        managed = False
        db_table = 'Users'

    def __str__(self):
        return self.email


class Membercontribution(models.Model):
    primaryid = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Users', models.DO_NOTHING, db_column='UserID')# Field name made lowercase.
    groupid = models.ForeignKey('Groups', models.CASCADE, db_column='GroupID')# Field name made lowercase.
    contribution = models.IntegerField(db_column='Contribution')# Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'MemberContribution'
        unique_together = (('userid', 'groupid'),)
    
    def __str__(self):
        return "User: " + str(self.userid) + " | Group: " + str(self.groupid)



class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'

