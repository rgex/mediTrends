<?php
$fileContent = file_get_contents("elasticsearchFinal.json");
$obj = json_decode($fileContent, true);
unset($fileContent);

foreach($obj as $key => $value)
{
	$address = $value['value']['Hausanschrift_Strasse'] . " " . $value['value']['Hausanschrift_Hausnummer'] . ", " . $value['value']['Hausanschrift_Postleitzahl'] . " " . $value['value']['Hausanschrift_Ort'];
	$address = urlencode($address);
	
	$response = json_decode(file_get_contents("http://maps.googleapis.com/maps/api/geocode/json?address=" . $address), true);
	print_r($response);
	
	$obj[$key]['value']['location'] = $response['results'][0]['geometry']['location'];

	if(isset($response['results'][0]['partial_match']))
	{
		$obj[$key]['value']['partial_match'] = $response['results'][0]['partial_match'];
	}

	foreach($response['results'][0]['address_components'] as $addressComponent)
	{
		if($addressComponent['types'][0] == 'administrative_area_level_1')
		{
			$obj[$key]['value']['Bundesland'] = $addressComponent['short_name'];
		}

		if($addressComponent['types'][0] == 'country')
		{
			$obj[$key]['value']['Land'] = $addressComponent['short_name'];
		}
	}

	sleep(1); // avoid to get blocked by the API
}

$fp = fopen("ElasticSearchWithGPSLocation.json", "a+");
fwrite($fp, json_encode($obj, JSON_PRETTY_PRINT));
fclose($fp);
?>
