1.	Open Apache in XAMPP.
2.	Create Environment (.env) file and add the configuration details needed to connect to the local MySQL Database.

APP_NAME=NCIPCalendar
APP_ENV=local
APP_KEY=base64:tQ05NvaZQqw2pyBabkYyfVSAbZ8ZJEOKhAX6nnuqhI8=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ncipCalendar
DB_USERNAME=root
DB_PASSWORD=

3. Run command: composer update

4. Run command: php artisan migrate

5.	Run command: php artisan db:seed

6. php artisan route:cache

7. npm install laravel-mix@latest --save-dev

8. npm run watch

9. In another terminal run command: php artisan serve