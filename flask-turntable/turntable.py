import os
from flask import Flask, request, redirect, url_for, send_from_directory, jsonify, render_template
from werkzeug.utils import secure_filename
import random

basedir = os.path.abspath(os.path.dirname(__file__))

UPLOAD_FOLDER = basedir + '/upload'
ALLOWED_EXTENSIONS = set(['mp3', 'm4a', 'wav'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return render_template('index.html')

@app.route('/get-song')
def get_song():
	songs = os.listdir(UPLOAD_FOLDER)
	filename = random.choice(songs)
	return jsonify(url='/uploads/'+filename)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

if __name__ == "__main__":
    app.debug = True
    app.run(threaded = True)