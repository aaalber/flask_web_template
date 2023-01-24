from flask import Blueprint, request, render_template

main = Blueprint('main_blueprint', __name__)

@main.route('/')
def index():

  return render_template('index.html')
