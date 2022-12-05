FROM registry.uzigood.tech/jenkins-base/nginx:alpine-v1
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
#COPY --from=builder /app/dist/build/h5 .
COPY dist/build/h5 .
COPY default.conf /etc/nginx/conf.d
ENTRYPOINT ["nginx", "-g", "daemon off;"]
