<?php
 $dni =  $_GET['dni'];



$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://aplicaciones007.jne.gob.pe/srop_publico/Consulta/api/AfiliadoApi/GetNombresCiudadano",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS =>"{ \"CODDNI\": $dni }",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json;chartset=utf-8",
    "Cookie: _ga=GA1.3.1858685327.1592927858; _gid=GA1.3.301309024.1593125141; ASP.NET_SessionId=c3tilnwmz3wh33ilhtir5z0s; _gat=1; _gat_dretTracker=1",
    "RequestVerificationToken: 57Tal2z0k0uhZmGsILXyDROif2dAbzA-xGwKDTiQrmJRKYWG_SN9xhCosGckxp4zp_tFeKPrARi9fXbomAGZSRk-MeI1NxxTaCDiO4cYDZ01:ddij9mTv4ssuVk-p7BwGXmx3WEwb2KBDdCnfuFDKUavspLafFIQwCBup6pxUp2dhBcyxFJxu1GkTGLgxJ2jeU_1oDgD4yVmCiQCM8OEYRu01"
  ),
));

$response = curl_exec($curl);

echo $response;