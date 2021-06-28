FROM node:12.22-alpine
RUN npx create-react-app stamp
WORKDIR /stamp
ADD https://github.com/wildme/stamp/tarball/master  /tmp
RUN tar xzf /tmp/master --strip-components=1 -C /stamp
RUN npm install --silent
EXPOSE 3001 3000
USER 1000 1000
CMD ["npm", "start"]
