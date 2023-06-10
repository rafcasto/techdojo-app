FROM node

# This is optional. Sets the level of logging that you see
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
WORKDIR /usr/src/app

# Copy project files into the docker image
COPY . .

# Install app dependencies

RUN npm set progress=false && npm install


# Make port 6006 available
EXPOSE 3000

# run storybook app
CMD ["yarn", "run", "start"]