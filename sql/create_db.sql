CREATE ROLE "keeperuser";
ALTER ROLE "keeperuser" with password 'password';
ALTER ROLE "keeperuser" with login;
CREATE DATABASE "keeperdb";
GRANT ALL PRIVILEGES ON DATABASE "keeperdb" TO "keeperuser";
