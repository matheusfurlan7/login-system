# login-system
Small login system

<hr>

### Topics

- [Project description](#project-description)
- [Tools used](#tools)
- [Download the project](#download-the-project)
- [Open and run the project](#open-and-run-the-project)

## Project description 
  A small login system to practice

## Tools
  - Node.js (Version: 18.13.0)
  - TypeScript
  - Express
  - Docker
  - Postgres
  - Prisma
  - JWT
  - Jest

## Download the project
  System versioning is done by Git, allowing three ways of downloading
  
  - [Https](#https)
  - [SSH](#ssh)
  - [ZIP](#zip)

### Https
  $ git clone https://github.com/matheusfurlan7/login-system.git

### SSH
  $ git clone git@github.com:matheusfurlan7/login-system.git

### ZIP
  The ZIP download is done directly on the GitHub website:

  1 - Access the website: https://github.com/matheusfurlan7/login-system;
  2 - Click in button green write "<> Code";
  3 - Click in button write "Download ZIP".

  Ready, your download is starting.

## Open and run the project
  After downloading the project, you can open it with your preferred text editor.

### Database in development
  To run the database, the [docker-compose](./docker-compose.yml) file was created.

#### load the database container
  $ docker-compose up

  If you prefer to run containers in the background
  $ docker-compose up -d

#### down the database container
  $ docker-compose down

### Run in development
  $ npm install -D
  $ npm run dev

### run in production
  $ npm install -D
  $ npm run start

## License
[The project is license of MIT](./LICENSE)