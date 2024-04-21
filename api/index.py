from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
VIEW_TIME = 0

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def welcome():
    return render_template("welcome.html",
                           message="Hello world!")

@app.route("/view")
def view():
    global VIEW_TIME
    VIEW_TIME += 1
    return "Viewed- " + str(VIEW_TIME)

@app.route("/upload", methods=['POST'])
def upload_file():
    return request.files
    if 'file' not in request.files:
        return 'No file part'
    
    file = request.files['file']
    
    if file.filename == '':
        return 'No selected file'
    
    if file and allowed_file(file.filename):
        return 'File uploaded successfully'
    else:
        return 'File type not allowed'

#  curl -H 'Content-Type: application/json' -d '{ "body":"file123"}' -X POST http://localhost:5000/upload