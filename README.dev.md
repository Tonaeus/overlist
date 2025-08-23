# Overlist

## Quick Start

1. Copy the repository:

   ```bash
   git clone https://github.com/Tonaeus/Overlist.git
   ```

2. Change the directory:

   ```bash
   cd Overlist
   ```

3. Rebuild and run the containers:

   ```bash
   docker-compose -f docker-compose.dev.yml up -d --build
   ```

4. Find the ports of the containers:

   ```bash
   docker-compose -f docker-compose.dev.yml ps
   ```

5. Stop and remove the containers:

   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

## Access

Once the containers are running, you can access them at [http://localhost:4173](http://localhost:4173).