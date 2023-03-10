import os
import logging

from flask import Flask, Blueprint
from flask_fontawesome import FontAwesome
from .config import BaseConfig

app = Flask(__name__)
fa = FontAwesome(app)

# blueprint for non-auth parts of app
from .main import main as main_blueprint
app.register_blueprint(main_blueprint)



if __name__ == "__main__":
  app.run(host='0.0.0.0')
