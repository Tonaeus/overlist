# Use MongoDB image
FROM mongo:latest

# Set environment variables
ENV MONGO_INITDB_ROOT_USERNAME=root_user
ENV MONGO_INITDB_ROOT_PASSWORD=root_password
ENV MONGO_INITDB_DATABASE=database

# Expose MongoDB port
EXPOSE 27017

# Start MongoDB server
CMD ["mongod"]
