<?php
            
 
                ini_set('display_errors', 'On');
                error_reporting(E_ALL);
 
$executionStartTime = microtime(true) ; 
 
 $url='http://api.geonames.org/wikipediaBoundingBoxJSON?north=53.5&south=49.5&east=1&west=-1&maxRows=500&username=rossgray96';
$ch = curl_init();
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_URL,$url);
 
                $result=curl_exec($ch);
 
                curl_close($ch);
 
                $decode = json_decode($result,true);
 
 
                
                if (array_key_exists("geonames", $decode)){ 
                $output['status']['description'] = "success"; 
                $output['status']['code'] = "200";
                $output['status']['name'] = "ok";
                } else {
                $output['status']['description'] = "failure";
                }
                $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
                if (array_key_exists("geonames", $decode))
                $output['data'] = $decode["geonames"];
 
header('Content-Type: application/json; charset=UTF-8');
 
echo json_encode($output);
