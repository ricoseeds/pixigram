# Pixigram -- A simple image sharing application

## Getting Started

1. Install required Gems

        $ cd path_to_pixigram && bundle install

2. create database.yml and .env

        $ cp config/database.yml.example config/database.yml

        $ cp .env.example .env

3. Create and migrate database.

        
        $ rails db:create && rails db:migrate 

        $rails s