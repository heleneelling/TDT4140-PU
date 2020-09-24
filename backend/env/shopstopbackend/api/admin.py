from django.contrib import admin
from . import models

# Admin models
admin.site.register(models.Users)
admin.site.register(models.Groups)
admin.site.register(models.Memberofgroup)
admin.site.register(models.Items)
admin.site.register(models.Iteminlist)
admin.site.register(models.Shoppinglists)
admin.site.register(models.Membercontribution)