FROM python:3.9

ARG ENV_FILE=.env
ENV ENV_FILE=${ENV_FILE}

WORKDIR /app
COPY . .

RUN pip3 install pipenv
RUN pipenv install

ENTRYPOINT pipenv run python seed.py && pipenv run gunicorn app:app -b 0.0.0.0:4000

EXPOSE 4000