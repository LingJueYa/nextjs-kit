#!/usr/bin/env bash

# 启动一个 Docker 容器，用于本地开发的 PostgreSQL 数据库
# 指定了脚本使用的解释器为 Bash

# 定义了数据库容器的名称
DB_CONTAINER_NAME="normalhuman-postgres"

# 检查 Docker 是否已安装。如果没有安装，输出提示信息并退出脚本
# !：这是逻辑非运算符
# -x：这是一个测试选项，用于检查文件是否可执行。结合 command -v 的输出，如果 Docker 安装了且可执行，-x 将返回真。
# command -v docker：这个命令用于查找 docker 命令的路径。如果 Docker 已安装，command -v 将返回 Docker 可执行文件的路径；如果未安装，则返回空。
# $(...)：这是命令替换的语法，它会执行括号内的命令并将输出结果替换到该位置。

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

# 如果容器已经在运行，输出信息并退出。

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  exit 0
fi

# 如果容器存在但未运行，则启动该容器并退出。

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing database container '$DB_CONTAINER_NAME' started"
  exit 0
fi

# 从 .env 文件中导入环境变量。
set -a
source .env

# 从 DATABASE_URL 中提取数据库密码和端口。
DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')

# 如果使用的是默认密码，提示用户是否生成随机密码。如果用户选择生成随机密码，则更新 .env 文件。
if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please change the default password in the .env file and try again"
    exit 1
  fi
  # Generate a random URL-safe password
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
fi

docker run -d \
  --name $DB_CONTAINER_NAME \
  -e POSTGRES_USER="postgres" \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -e POSTGRES_DB=normalhuman \
  -p "$DB_PORT":5432 \
  docker.io/postgres && echo "Database container '$DB_CONTAINER_NAME' was successfully created"
