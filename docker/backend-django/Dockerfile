FROM        python:3.11.5

# Install system dependencies including libgl1-mesa-glx
RUN         apt-get update && apt-get install -y \
            libgl1-mesa-glx \
            && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV         PYTHONUNBUFFERED 1
ENV         DJANGO_SETTINGS_MODULE=aiscript.settings

# Set working directory in the container
WORKDIR     /app

# Copy requirements file to the working directory and install dependencies
COPY        requirements.txt /app/
RUN         pip install --no-cache-dir -r requirements.txt

# Copy the entrypoint script into the container
COPY        entrypoint.sh /entrypoint.sh
RUN         chmod +x /entrypoint.sh

# Expose the listening port
EXPOSE      8000

# Set the entrypoint
ENTRYPOINT  ["/entrypoint.sh"]

# Run the Django server
CMD         ["python", "manage.py", "runserver", "0.0.0.0:8000"]
