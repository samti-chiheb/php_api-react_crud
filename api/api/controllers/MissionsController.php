<?php
include_once '/Applications/MAMP/htdocs/rimender_poo/api/models/MissionModel.php';

class MissionsController
{
  private $missionModel;

  public function __construct()
  {
    $this->missionModel = new MissionModel();
  }

  public function getAll()
  {
    $stmt = $this->missionModel->getMissions();
    $missions = $stmt->fetchAll();
    echo json_encode($missions);
  }

  public function get($id)
  {
    $stmt = $this->missionModel->getMission($id);
    $mission = $stmt->fetch();
    echo json_encode($mission);
  }

  public function create($mission)
  {
    $result = $this->missionModel->createMission($mission);
    echo json_encode(['result' => $result]);
  }

  public function update($mission)
  {
    $result = $this->missionModel->updateMission($mission);
    echo json_encode(['result' => $result]);
  }

  public function delete($id)
  {
    $result = $this->missionModel->deleteMission($id);
    echo json_encode(['result' => $result]);
  }
}
