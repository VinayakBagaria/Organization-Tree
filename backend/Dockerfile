FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/requirements.txt

RUN pip install --upgrade pip==23.0.1
RUN pip install -r requirements.txt
COPY . /usr/src/app/

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/docker-entrypoint.sh && ln -s /usr/local/bin/docker-entrypoint.sh /
CMD ["docker-entrypoint.sh"]
EXPOSE 80