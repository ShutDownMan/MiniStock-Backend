
sudo docker compose down
sudo rm -rf database/data
sudo docker compose up -d --build database
