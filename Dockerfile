FROM python:3.11-slim

WORKDIR /app

# Install minimal dependencies
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy ONLY our production server
COPY production-server.py .

# Environment
ENV PORT=5002
ENV PYTHONUNBUFFERED=1

EXPOSE 5002

# Run our ONE server
CMD ["python", "production-server.py"]