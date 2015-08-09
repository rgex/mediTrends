<?php
set_time_limit(0);

$folder = "combined-saved";

$dir = opendir($folder);
while($file = readdir($dir))
{
	if($file != ".." && $file != ".")
	{
		echo $file . "<br/>";
		$content = file_get_contents($folder . "/" . $file);
		
		$obj = json_decode($content, true);
		$fileName = explode(".", $file);
		$obj['_id'] = $fileName[0];
		$content = json_encode($obj);
		$ch = curl_init();

		//set the url, number of POST vars, POST data
		curl_setopt($ch,CURLOPT_URL, "http://127.0.0.1:5984/krankenhauser");
		curl_setopt($ch,CURLOPT_POSTFIELDS, $content);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                                            'Content-Type: application/json',
                                            'Connection: Keep-Alive'
                                            ));

		//execute post
		$result = curl_exec($ch);

		//close connection
		curl_close($ch);

		//die();
	}
}

?>
