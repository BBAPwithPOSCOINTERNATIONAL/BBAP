# Use an official Python slim runtime as a parent image
FROM python:3.9.7-slim-buster

# Set build arguments for versions
ARG DEBIAN_FRONTEND=noninteractive

# Set the working directory in the container to /app
WORKDIR /app

# Add the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN apt-get update -y \
    && apt-get upgrade -y \
    && apt-get install -y build-essential cmake libgl1-mesa-glx libglib2.0-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Run the command to start uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]