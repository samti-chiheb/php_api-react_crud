<?php
include_once '/Applications/MAMP/htdocs/rimender_poo/api/config/Database.php';

class RecruiterModel
{
  private $conn;

  public function __construct()
  {
    $this->conn = Database::getInstance();
  }

  public function getRecruiters()
  {
    $query = "SELECT * FROM Recruiters";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  public function getRecruiter($id)
  {
    $query = "SELECT * FROM Recruiters WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt;
  }

  public function createRecruiter($recruiter)
  {
    $query = "INSERT INTO Recruiters (user_id, name, email, phone)
                  VALUES (:user_id, :name, :email, :phone)";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':user_id', $recruiter['user_id']);
    $stmt->bindParam(':name', $recruiter['name']);
    $stmt->bindParam(':email', $recruiter['email']);
    $stmt->bindParam(':phone', $recruiter['phone']);

    return $stmt->execute();
  }

  public function updateRecruiter($recruiter)
  {
    $query = "UPDATE Recruiters 
                  SET user_id = :user_id, name = :name, email = :email, phone = :phone
                  WHERE id = :id";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':user_id', $recruiter['user_id']);
    $stmt->bindParam(':name', $recruiter['name']);
    $stmt->bindParam(':email', $recruiter['email']);
    $stmt->bindParam(':phone', $recruiter['phone']);
    $stmt->bindParam(':id', $recruiter['id']);

    return $stmt->execute();
  }

  public function deleteRecruiter($id)
  {
    $query = "DELETE FROM Recruiters WHERE id = :id";

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);

    return $stmt->execute();
  }
}