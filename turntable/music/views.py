from django.shortcuts import render_to_response
from django.template import RequestContext, loader
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse

from music.models import Song
from music.forms import UploadForm

def list(request):
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            newsong = Song(musicFile = request.FILES['songfile'])
            newsong.save()

            # Redirect to the document list after POST
            return HttpResponseRedirect(reverse('music.views.list'))
    else:
        form = UploadForm() # A empty, unbound form

    # Load documents for the list page
    songs = Song.objects.all()

    context = RequestContext(request, {
        'documents': songs, 'form': form
    })
    template = loader.get_template('music/index.html')

    # Render list page with the documents and the form    
    return HttpResponse(template.render(context))
