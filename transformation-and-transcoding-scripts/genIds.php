<?php
$fileContent = file_get_contents("behandlungen.json");
$obj = json_decode($fileContent, true);
unset($fileContent);
$iks = array();


foreach($obj["rows"] as $key => $value)
{
	$idExp = explode("_", $value["id"]);
	$id = $idExp[0];
	if(!in_array($id, $iks))
	{
		$iks[$id] = "";
	}
	unset($value);
	unset($key);
}

$i=1;
foreach($iks as $key => $value)
{
	$iks[$key] = $i;
	$i++;
}

$fp = fopen("ids.json", "a+");
fwrite($fp, json_encode($iks, JSON_PRETTY_PRINT));
fclose($fp);
?>
