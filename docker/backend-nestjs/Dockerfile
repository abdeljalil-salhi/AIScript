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

# Install NestJS CLI globally
RUN         npm install -g @nestjs/cli

# Expose the listening port
EXPOSE      3000

# Run the NestJS server
ENTRYPOINT  [ "/bin/sh", "-c", "npx prisma migrate dev && npm install && npm run start:dev" ]
