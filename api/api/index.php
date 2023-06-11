<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("HTTP/1.1 200 OK");
  exit;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

$resource = $uri[3]; // Get the resource name from the URL, e.g., 'users', 'recruiters', 'missions'

$controllerFile = "./controllers/{$resource}Controller.php"; // Determine the appropriate controller file based on the resource

if (file_exists($controllerFile)) {
  include_once $controllerFile;

  $className = ucfirst($resource) . 'Controller'; // Derive the class name based on the resource
  $controller = new $className();

  switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
      if (isset($uri[4])) {
        $controller->get($uri[4]);
      } else {
        $controller->getAll();
      }
      break;

    case 'POST':
      $input = (array) json_decode(file_get_contents('php://input'), FALSE);
      $controller->create($input);
      break;

    case 'PUT':
      if (isset($uri[4])) {
        $input = (array) json_decode(file_get_contents('php://input'), FALSE);
        $controller->update($input);
      } else {
        header("HTTP/1.1 400 Bad Request");
      }
      break;

    case 'DELETE':
      if (isset($uri[4])) {
        $controller->delete($uri[4]);
      } else {
        header("HTTP/1.1 400 Bad Request");
      }
      break;

    default:
      header("HTTP/1.1 405 Method Not Allowed");
      exit();
      break;
  }
} else {
  header("HTTP/1.1 404 Not Found");
  exit();
}
