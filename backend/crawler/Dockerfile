# Use an alpine-based Python 3.9 image
FROM python:3.9-alpine


# Set timezone
ENV TZ=Asia/Seoul


# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install required system dependencies
RUN apk add --no-cache \
    curl \
    gnupg \
    chromium-chromedriver \
    mariadb-dev \
    build-base

# Set working directory
WORKDIR /usr/src/app

# Copy only the Python dependencies list initially to leverage Docker caching
COPY requirements.txt ./requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project files to the container
COPY . .

# The CMD to run when the container is started
CMD ["python", "main.py"]