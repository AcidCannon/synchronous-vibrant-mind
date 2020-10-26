# start from an official image
FROM python:3.8.5

ENV APP_ROOT /src
ENV CONFIG_ROOT /config

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir ${CONFIG_ROOT}
# install dependencies
COPY requirements.txt ${CONFIG_ROOT}/requirements.txt
RUN pip install -r ${CONFIG_ROOT}/requirements.txt

# arbitrary location choice: you can change the directory
RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

# copy our project code
ADD . ${APP_ROOT}

ENTRYPOINT ["sh","entrypoint.sh"]
