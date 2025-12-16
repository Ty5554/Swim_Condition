# WSGI サーバー（gunicorn 等）から Django を起動するためのエントリポイントです。
import os
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
application = get_wsgi_application()
