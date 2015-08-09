<?php
set_time_limit(0);

$folder = "./2013/Berichte-KH/";
$jsonFolder = "./json/2013/";
$dir = opendir($folder);

while($file = readdir($dir))
{	
	preg_match_all("#^([0-9]{1,})-#USi",$file, $out);
	$filePath = $folder.$file;
	if(file_exists($filePath) && is_file($filePath))
	{
		$IK = $out[1][0];
		$fileContent = file_get_contents($filePath);
		try{
			$xml = new SimpleXMLElement($fileContent);
			$xml_array = unserialize(serialize(json_decode(json_encode((array) $xml), 1)));
			if(isset($xml_array['Datensatz']))
			{
				$date = time(date($xml_array['Datensatz']['Datum'] . ' ' . $xml_array['Datensatz']['Uhrzeit']));
				$jsonFilePath = $jsonFolder . $IK . ".json";
				if(file_exists($jsonFilePath))
				{
					$json = json_decode(file_get_contents($jsonFilePath), true);
					$jsonDate = time(date($json['Datensatz']['Datum'] . ' ' . $json['Datensatz']['Uhrzeit']));
					if($jsonDate > $date)
					{
						unlink($jsonFilePath);
						$fp = fopen($jsonFilePath,"a+");
						fwrite($fp, json_encode($xml_array, JSON_PRETTY_PRINT));
						fclose($fp);
					}
				}
				else
				{
					$fp = fopen($jsonFilePath,"a+");
					fwrite($fp, json_encode($xml_array, JSON_PRETTY_PRINT));
					fclose($fp);
				}
			}
		} catch(Exception $e)
		{
			echo "one error<br/>";
		}
		//break;
	}
}
?>
