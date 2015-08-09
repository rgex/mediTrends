<?php
$fileContent = file_get_contents("ids.json");
$ids = json_decode($fileContent, true);

$fileContent = file_get_contents("behandlungen.json");
$obj = json_decode($fileContent, true);
unset($fileContent);
$iks = array();
$i = 0;
$fp = fopen("kv.txt", "a+");

foreach($obj["rows"] as $value)
{
	$idExp = explode("_", $value["id"]);
	$id = $idExp[0];
	$year = substr($idExp[1], 2, 2);

	foreach($value['value'] as $key => $fallzahl)
	{
		$KVkey = $ids[$id] . "_" . $year . "_" . $key;
		$fallzahl = round($fallzahl * 100)/100;
		fwrite($fp, $KVkey . ":" . $fallzahl . "
");
		$i++;
	}
	unset($value);
	unset($key);
}

fclose($fp);

echo "wrote: " . $i . " KV entries";
?>
