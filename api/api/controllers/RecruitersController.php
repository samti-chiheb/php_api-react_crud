<?php
include_once '/Applications/MAMP/htdocs/rimender_poo/api/models/RecruiterModel.php';

class RecruitersController
{
  private $recruiterModel;

  public function __construct()
  {
    $this->recruiterModel = new RecruiterModel();
  }

  public function getAll()
  {
    $stmt = $this->recruiterModel->getRecruiters();
    $recruiters = $stmt->fetchAll();
    echo json_encode($recruiters);
  }

  public function get($id)
  {
    $stmt = $this->recruiterModel->getRecruiter($id);
    $recruiter = $stmt->fetch();
    echo json_encode($recruiter);
  }

  public function create($recruiter)
  {
    $result = $this->recruiterModel->createRecruiter($recruiter);
    echo json_encode(['result' => $result]);
  }

  public function update($recruiter)
  {
    $result = $this->recruiterModel->updateRecruiter($recruiter);
    echo json_encode(['result' => $result]);
  }

  public function delete($id)
  {
    $result = $this->recruiterModel->deleteRecruiter($id);
    echo json_encode(['result' => $result]);
  }
}
