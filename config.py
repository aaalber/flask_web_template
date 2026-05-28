import os


class BaseConfig():
  """Base configuration."""
  MAIL_SERVER = 'localhost:25'
  SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-change-in-production')
  SECURITY_PASSWORD_SALT = ''
