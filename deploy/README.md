# VM deployment with Docker (no Java/npm on host)

This approach uses Docker containers, so you do NOT need to install Java or npm on the VM. Nginx runs inside a container and proxies `/api` to the Spring Boot container.

## 1) Install Docker on the VM

```bash
# Ubuntu 22.04+ suggested
sudo apt-get update && sudo apt-get install -y ca-certificates curl gnupg git

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.gpg > /dev/null

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo usermod -aG docker $USER
newgrp docker
```

## 2) Clone the repo

```bash
sudo mkdir -p /var/www/task-app
sudo chown -R $USER:$USER /var/www/task-app
cd /var/www/task-app

git clone https://github.com/GehanFonseka/Devops-Task-App.git
cd Devops-Task-App
```

## 3) Build and run

```bash
docker compose build
# starts nginx (frontend) on :80 and spring boot on :8080
# reverse-proxy already configured in task-frontend/nginx.conf

docker compose up -d

docker compose ps
```

- Frontend: http://YOUR_VM_IP/
- Backend (optional direct): http://YOUR_VM_IP:8080/api/tasks

## 4) Run on boot with systemd

Copy the service file and enable it:

```bash
sudo mkdir -p /etc/systemd/system
sudo cp /var/www/task-app/Devops-Task-App/deploy/systemd/task-app.service /etc/systemd/system/task-app.service

sudo systemctl daemon-reload
sudo systemctl enable task-app
sudo systemctl start task-app

# Verify
sudo systemctl status task-app --no-pager -l
```

This service runs `docker compose up -d` at boot, and `down` on stop.

## Notes
- CORS and proxying are already configured in code (WebConfig + nginx.conf).
- For HTTPS, put a TLS-terminating proxy/load balancer in front (e.g., Caddy, Nginx with certbot, or a cloud LB).
- To deploy updates:
  ```bash
  cd /var/www/task-app/Devops-Task-App
  git pull origin main
  docker compose build --no-cache
  docker compose up -d
  ```
