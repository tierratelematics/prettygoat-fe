FROM nginx:1.10-alpine

# Copy static files
ADD ["files/", "/"]

# The website port, configured nginx config file
EXPOSE 9120

# Copy application built files (website content)
ADD ["./build/", "/usr/share/nginx/html/main/"]

CMD ["nginx", "-g", "daemon off;"]