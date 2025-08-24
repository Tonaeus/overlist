# Overlist

## Quick Start

1. Copy the repository:

   ```bash
   git clone https://github.com/Tonaeus/overlist.git
   ```

2. Change the directory:

   ```bash
   cd overlist
   ```

## Development

1. Rebuild and run the containers:

   ```bash
   docker-compose -f docker-compose.dev.yml up -d --build
   ```

2. Find the ports of the containers:

   ```bash
   docker-compose -f docker-compose.dev.yml ps
   ```

3. Stop and remove the containers:

   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

4. Access the containers at [http://localhost:5173](http://localhost:5173).

## Staging

1. Rebuild and run the containers:

   ```bash
   docker-compose -f docker-compose.yml up -d --build
   ```

2. Find the ports of the containers:

   ```bash
   docker-compose -f docker-compose.yml ps
   ```

3. Stop and remove the containers:

   ```bash
   docker-compose -f docker-compose.yml down
   ```

4. Access the containers at [http://localhost:4173](http://localhost:4173).

## Production

1. Generate JWT secret

   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
