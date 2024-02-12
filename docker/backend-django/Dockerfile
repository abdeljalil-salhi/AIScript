FROM    python:3.11.5

# Set environment variables
ENV     PYTHONUNBUFFERED 1
ENV     DJANGO_SETTINGS_MODULE=aiscript.settings

# Set working directory in the container
WORKDIR /app

# Copy requirements file to the working directory and install dependencies
COPY    requirements.txt /app/
RUN     pip install --no-cache-dir -r requirements.txt

# Expose the listening port
EXPOSE  8000

# Run the Django server
CMD     ["python", "manage.py", "runserver", "0.0.0.0:8000"]
