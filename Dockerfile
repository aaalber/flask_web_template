FROM python:3.9-slim

ENV FLASK_ENV=development
ENV FLASK_DEBUG=1

RUN mkdir -p /app/flask_web_template

WORKDIR /app/flask_web_template

ADD . /app/flask_web_template

RUN pip install -r requirements.txt

EXPOSE 8000/tcp

CMD ["gunicorn", "--chdir", "/app", "flask_web_template:app", "-b", "0.0.0.0:8000"]
