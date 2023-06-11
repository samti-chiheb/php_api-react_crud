<?php
include_once '/Applications/MAMP/htdocs/rimender_poo/api/config/Database.php';

class MissionModel
{
  private $conn;

  public function __construct()
  {
    $this->conn = Database::getInstance();
  }

  public function getMissions()
  {
    $query = "SELECT * FROM Missions";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  public function getMission($id)
  {
    $query = "SELECT * FROM Missions WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt;
  }

  public function createMission($mission)
  {
    $query = "INSERT INTO Missions (user_id, recruiter_id, client_name, name, location, remote, start_date, end_date, description, rate)
                  VALUES (:user_id, :recruiter_id, :client_name, :name, :location, :remote, :start_date, :end_date, :description, :rate)";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':user_id', $mission['user_id']);
    $stmt->bindParam(':recruiter_id', $mission['recruiter_id']);
    $stmt->bindParam(':client_name', $mission['client_name']);
    $stmt->bindParam(':name', $mission['name']);
    $stmt->bindParam(':location', $mission['location']);
    $stmt->bindParam(':remote', $mission['remote']);
    $stmt->bindParam(':start_date', $mission['start_date']);
    $stmt->bindParam(':end_date', $mission['end_date']);
    $stmt->bindParam(':description', $mission['description']);
    $stmt->bindParam(':rate', $mission['rate']);

    return $stmt->execute();
  }

  public function updateMission($mission)
  {
    $query = "UPDATE Missions 
                  SET user_id = :user_id, recruiter_id = :recruiter_id, client_name = :client_name, name = :name, location = :location,
                  remote = :remote, start_date = :start_date, end_date = :end_date, description = :description, rate = :rate
                  WHERE id = :id";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':user_id', $mission['user_id']);
    $stmt->bindParam(':recruiter_id', $mission['recruiter_id']);
    $stmt->bindParam(':client_name', $mission['client_name']);
    $stmt->bindParam(':name', $mission['name']);
    $stmt->bindParam(':location', $mission['location']);
    $stmt->bindParam(':remote', $mission['remote']);
    $stmt->bindParam(':start_date', $mission['start_date']);
    $stmt->bindParam(':end_date', $mission['end_date']);
    $stmt->bindParam(':description', $mission['description']);
    $stmt->bindParam(':rate', $mission['rate']);
    $stmt->bindParam(':id', $mission['id']);

    return $stmt->execute();
  }

  public function deleteMission($id)
  {
    $query = "DELETE FROM Missions WHERE id = :id";

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);

    return $stmt->execute();
  }
}
