FROM node:12.22-alpine
RUN npx create-react-app stamp
WORKDIR /stamp
ADD https://github.com/wildme/stamp/tarball/v0.5  /tmp
RUN tar xzf /tmp/wild-stamp-v0.5-0-g9d150da --strip-components=1 -C /stamp
RUN npm install --silent
EXPOSE 3001 3000
USER 1000 1000
CMD ["npm", "start"]
