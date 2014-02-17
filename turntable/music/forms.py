from django import forms

class UploadForm(forms.Form):
    uploadForm = forms.FileField(
        label='Select a song to upload',
        help_text='max. 42 megabytes'
    )
