from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from django.conf import settings
from tmob.views import api

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

    url(r'^admin/', include(admin.site.urls)),
    (r'^api/(.*)$', api, {}, 'api-view'),
    url(r'^.*$', TemplateView.as_view(template_name='home.html'), name="home"),

)
