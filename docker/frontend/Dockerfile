FROM        node:lts

# Set system timezone to Africa/Casablanca and clean up
RUN         apt-get update && \
            apt-get -y --no-install-recommends install tzdata && \
            ln -sf /usr/share/zoneinfo/Africa/Casablanca /etc/localtime && \
            echo "Africa/Casablanca" >/etc/timezone && \
            dpkg-reconfigure -f noninteractive tzdata && \
            apt-get autoremove -y && \
            apt-get clean && \
            rm -rf /var/lib/apt/lists/*

# Set working directory in the container
WORKDIR     /app

# Expose the listening port
EXPOSE      5173

# Run the frontend server
ENTRYPOINT  [ "/bin/sh", "-c", "npm install && npm run dev" ]
