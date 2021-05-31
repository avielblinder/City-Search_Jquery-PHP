<?php

require_once 'config/DbConnection.php';
$cities = [];

if(isset($_GET['search'])){
  $search  = $_GET['search'];
  $con = new DbConnection;
  $db = $con->connect();
  $sql = "SELECT * FROM cities WHERE name LIKE ? OR zip_code LIKE ?";
  $query = $db->prepare($sql);
  $query->setFetchMode(PDO::FETCH_OBJ);
  $query->execute( ["%$search%", "%$search%"] );
  $result = $query->fetchAll();
  $cities = ($result) ? $result : [];
  
  print_r(json_encode($cities, JSON_UNESCAPED_UNICODE ));
}

if($_SERVER['REQUEST_METHOD'] === 'GET'){
  if(!isset($_GET['search'])){
    $con = new DbConnection;
    $db = $con->connect();
    $sql = "SELECT * FROM cities";
    $query = $db->prepare($sql);
    $query->execute();
    $result = $query->fetchAll();
    $cities = ($result) ? $result : [];
    
    print_r(json_encode($cities, JSON_UNESCAPED_UNICODE ));
  }
}