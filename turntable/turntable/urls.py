from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'turntable.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    # Here we mount the app under /music. Feel free to use something else
    url(r'^', include('music.urls')),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': '/static'}),
    url(r'^admin/', include(admin.site.urls)),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
