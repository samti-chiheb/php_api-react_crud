<?php
class Database
{
  private static $instance = null;

  private $host = 'localhost';
  private $db_name = 'rimender';
  private $username = 'rimender_admin';
  private $password = 'Test22022449';

  private function __construct()
  {
    try {
      $conn = new PDO("mysql:host=$this->host;dbname=$this->db_name", $this->username, $this->password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
      self::$instance = $conn;
    } catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
    }
  }

  public static function getInstance()
  {
    if (self::$instance == null)
      new Database();
    return self::$instance;
  }
}
