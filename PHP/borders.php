<?php
               
 
                ini_set('display_errors', 'On');
                error_reporting(E_ALL);
                header('Content-Type: application/json; charset=UTF-8');
$executionStartTime = microtime(true) ; 

$result = file_get_contents("countryBorders.geo.json");

$country = $_GET["country"]; 
 
                $decode = json_decode($result,true);
 
                foreach ($decode["features"] as $feature) {
                    $geometry = $feature["geometry"];
$iso = $feature["properties"]["iso_a2"];

if($iso == $country) {
    $output['data'] = $geometry;
};
                
}
                
                    
                    
                $output['status']['code'] = "200";
                $output['status']['name'] = "ok";
                $output['status']['description'] = "success";
                $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
                // var_dump($decode);
                
 

 
echo json_encode($output);

?>