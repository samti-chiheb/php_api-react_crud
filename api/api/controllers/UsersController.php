<?php
include_once '/Applications/MAMP/htdocs/rimender_poo/api/models/UserModel.php';

class UsersController
{
  private $userModel;

  public function __construct()
  {
    $this->userModel = new UserModel();
  }

  public function getAll()
  {
    $stmt = $this->userModel->getUsers();
    $users = $stmt->fetchAll();
    echo json_encode($users);
  }

  public function get($id)
  {
    $stmt = $this->userModel->getUser($id);
    $user = $stmt->fetch();
    echo json_encode($user);
  }

  public function create($user)
  { 
    $result = $this->userModel->createUser($user);
    echo json_encode(['result' => $result]);
  }

  public function update($user)
  {
    $result = $this->userModel->updateUser($user);
    echo json_encode(['result' => $result]);
  }

  public function delete($id)
  {
    $result = $this->userModel->deleteUser($id);
    echo json_encode(['result' => $result]);
  }
}
