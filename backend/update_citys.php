<?php

require_once 'config/DbConnection.php';

$data_cities= [];
$cities_names= [];
$db_cities =[];
$db_cities_names =[];

function truncate($db ){
  $sql = "TRUNCATE TABLE cities";
  $query = $db->prepare($sql); 
  $query->execute(); 
}

$url = 'https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=99999';
$init = curl_init($url);
curl_setopt($init, CURLOPT_URL, $url);
curl_setopt($init, CURLOPT_RETURNTRANSFER,true);
$result = curl_exec($init);
$result = json_decode($result);
$result = $result->result->records;

foreach($result as $item){
  $city = new stdClass;
  $city->name = $item->שם_ישוב ;
  $city->zip_code = $item->סמל_ישוב;
  $city->name = trim($city->name);
  $city->name = str_replace( '(','',$city->name);
  $city->name = str_replace( ')','-',$city->name);
  $city->name = str_replace( '\\','',$city->name);
  $city->name = str_replace( '/','',$city->name);
  $cities_names [] = $city->name;
  $data_cities[] = $city;
}

$database = new DbConnection;
$db = $database->connect();

$sql = "SELECT * FROM cities";
$query = $db->prepare($sql);
$query->execute();
$result = $query->fetchAll();
$db_cities = ($result) ? $result : [];
foreach($db_cities as $city){
  $db_cities_names[] = $city['name'];
}

if(count($db_cities_names) !== count($cities_names)){
  truncate($db);
  foreach($data_cities as $city){
    $sql = "INSERT INTO cities
            VALUES('',?,?)";
  
    $query = $db->prepare($sql); 
    $query->execute([$city->name,$city->zip_code]); 
  }
  
  if($query->rowCount() >0){
    echo '<h3>db has updated<h3>';
  }
};
