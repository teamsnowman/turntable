import os
from flask import Flask, request, redirect, url_for, send_from_directory, jsonify, render_template
from werkzeug.utils import secure_filename
import random
import boto

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
            s3 = boto.connect_s3(aws_access_key_id = os.environ["AWS_ACCESS_KEY_ID"], 
                aws_secret_access_key = os.environ["AWS_SECRET_ACCESS_KEY"])
            bucket = s3.create_bucket('nmoroze-turntable')
            key = bucket.new_key(filename)
            key.set_contents_from_file(file, headers=None, replace=True, cb=None, num_cb=10, policy=None, md5=None) 

    return render_template('index.html')

@app.route('/get-song')
def get_song():
    s3 = boto.connect_s3(aws_access_key_id = os.environ["AWS_ACCESS_KEY_ID"], 
        aws_secret_access_key = os.environ["AWS_SECRET_ACCESS_KEY"])
    bucket = s3.create_bucket('nmoroze-turntable')
    keys = bucket.list()
    urls = []
    for key in keys:
        urls.append(key.generate_url(expires_in=1800))

    print urls
    filename = random.choice(urls)
    return jsonify(url=filename)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

if __name__ == "__main__":
    app.debug = True
    app.run(port=8080, threaded = True)