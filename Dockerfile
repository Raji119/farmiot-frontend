FROM node:14.18.1

# Set the working directory
WORKDIR /app

# Install serve globally
RUN npm install -g serve

ARG CACHEBUST
RUN echo $CACHEBUST

# Clone the repository and build the app
RUN git clone https://github.com/Raji119/farmiot-frontend.git . && \
    npm install && \
    npm run build

# Expose the port
EXPOSE 3000

# Run the app
CMD ["serve", "-s", "build"]