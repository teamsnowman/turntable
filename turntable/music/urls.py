from django.conf.urls import patterns, url

urlpatterns = patterns('music.views',
    url(r'^list/$', 'list', name='list'),
    url(r'^get-song/$', 'get_song', name='get_song'),
)
