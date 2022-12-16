<?php
            
 
                ini_set('display_errors', 'On');
                error_reporting(E_ALL);
 
$executionStartTime = microtime(true) ; 
 
 $url='https://api.openweathermap.org/data/2.5/weather?q='.$_REQUEST["countryName"].'&appid=a444db9e6f268184228a455b0e6a15f6';

$ch = curl_init();
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_URL,$url);
 
                $result=curl_exec($ch);
 
                curl_close($ch);
 
                $decode = json_decode($result,true);
 
 
                
                if (array_key_exists("weather", $decode)){ 
                $output['status']['description'] = "success"; 
                $output['status']['code'] = "200";
                $output['status']['name'] = "ok";
                } else {
                $output['status']['description'] = "failure";
                }
                $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
                if (array_key_exists("weather", $decode))
                $output['data'] = $decode;
 
header('Content-Type: application/json; charset=UTF-8');
 
echo json_encode($output);