<?php
include_once '/Applications/MAMP/htdocs/rimender_poo/api/config/Database.php';

class UserModel
{
  private $conn;

  public function __construct()
  {
    $this->conn = Database::getInstance();
  }

  public function getUsers()
  {
    $query = "SELECT * FROM Users";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  public function getUser($id)
  {
    $query = "SELECT * FROM Users WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt;
  }

  public function createUser($user)
  {
    $query = "INSERT INTO Users (username, password, firstname, lastname, email)
                  VALUES (:username, :password, :firstname, :lastname, :email)";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':username', $user['username']);
    $stmt->bindParam(':password', $user['password']);
    $stmt->bindParam(':firstname', $user['firstname']);
    $stmt->bindParam(':lastname', $user['lastname']);
    $stmt->bindParam(':email', $user['email']);

    return $stmt->execute();
  }

  public function updateUser($user)
  {
    $query = "UPDATE Users 
                  SET username = :username, password = :password, firstname = :firstname, lastname = :lastname, email = :email
                  WHERE id = :id";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':username', $user['username']);
    $stmt->bindParam(':password', $user['password']);
    $stmt->bindParam(':firstname', $user['firstname']);
    $stmt->bindParam(':lastname', $user['lastname']);
    $stmt->bindParam(':email', $user['email']);
    $stmt->bindParam(':id', $user['id']);

    return $stmt->execute();
  }

  public function deleteUser($id)
  {
    $query = "DELETE FROM Users WHERE id = :id";

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);

    return $stmt->execute();
  }
}