Create database with name: laravel

php artisan migrate:refresh

php artisan serve

php artisan queue:listen

For running unit test
.\vendor\bin\phpunit

Start the server For websocket
php artisan websockets:serve

For websocket

Laravel WebSockets can be installed via composer:

composer require beyondcode/laravel-websockets
The package will automatically register a service provider.

This package comes with a migration to store statistic information while running your WebSocket server. You can publish the migration file using:

php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="migrations"
Run the migrations with:

php artisan migrate
Next, you need to publish the WebSocket configuration file:

php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="config"

composer require pusher/pusher-php-server "~3.0"

Put BROADCAST_DRIVER with value pusher in .env
BROADCAST_DRIVER=pusher

Adding this value could be random values in .env
PUSHER_APP_ID=insta_pusher
PUSHER_APP_KEY=123456_key
PUSHER_APP_SECRET=123456_secret_abc
PUSHER_APP_CLUSTER=mt1

In the file broadcasting.php adding the options parameters
'pusher' => [
'driver'  => 'pusher',
'key'     => env('PUSHER_APP_KEY'),
'secret'  => env('PUSHER_APP_SECRET'),
'app_id'  => env('PUSHER_APP_ID'),
'options' => [
'cluster' => env('PUSHER_APP_CLUSTER'),
'useTLS'  => true,
'host' => '127.0.0.1',
'port' => 6001,
'scheme' => 'http',
'useTLS' => false,
],
],

Add in app/Providers/BroadcastServiceProvider the routes for broadcast
class BroadcastServiceProvider extends ServiceProvider
{
/**
* Bootstrap any application services.
*
* @return void
  */
  public function boot()
  {
  Broadcast::routes();

Start the server
php artisan websockets:serve

See dashboard
The default location of the WebSocket dashboard is at SERVER_URL/laravel-websockets
Ex: http://127.0.0.1:8000/laravel-websockets

For create a new broadcasting channel
Create an event when you setup the private channel

class FileZipped implements ShouldBroadcast
{
use Dispatchable, InteractsWithSockets, SerializesModels;

Declare a method broadcastOn in that event set a new PrivateChannel
public function broadcastOn()
{
return new PrivateChannel('fileszipped.'.$this->fileUser->user->email);
}

Call this event fron the code whenever you want
event(new FileZipped($this->fileUser));

Go to routes/channels.php
And declare authorization to the previous created channel

Broadcast::channel('fileszipped.{email}', function ($user, $email) {
return $user->email == $email; // if this return true you authorize de access to the suscribe and listen to this chanenl
// return true;
});

In order to suscribe to a private channel we need authorization
For avoid cors issues we need to add in config/cors this

'broadcasting/auth'

Stay in this way

'paths' => ['api/*', 'sanctum/csrf-cookie', 'broadcasting/auth'],

For problem with cors add package fruitcake/laravel-cors
