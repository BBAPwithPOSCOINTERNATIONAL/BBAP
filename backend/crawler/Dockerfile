FROM python:3.9-slim

COPY  . /app

ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    libmariadb-dev-compat \
    pkg-config

RUN pip install --no-cache-dir -r /app/requirements.txt


RUN apt-get update && \
    apt-get install -y --no-install-recommends unzip xvfb curl wget ca-certificates apt-transport-https gnupg && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends google-chrome-stable && \
    rm -rf /var/lib/apt/lists/* && \
    wget "https://chromedriver.storage.googleapis.com/$(curl https://chromedriver.storage.googleapis.com/LATEST_RELEASE)/chromedriver_linux64.zip" && \
    unzip chromedriver_linux64.zip && \
    mv chromedriver /usr/bin/chromedriver && \
    chown root:root /usr/bin/chromedriver && \
    chmod +x /usr/bin/chromedriver

EXPOSE 80

WORKDIR /app

CMD ["python", "./main.py"]