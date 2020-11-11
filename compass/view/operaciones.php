<?php
class Operaciones
{
    public function __construct()
    {
     
    }

    public function montoAfecto($afecto)
    {
        $a = 0;

        foreach ($afecto as $arr) {

            if ($arr['vd_ina'] == 0) {
                $a += (($arr['vd_pre'] - $arr['vd_igv_unico']) * $arr['vd_can']);
            } else {
                $a = 0.0;
            }
        }
        return number_format($a, 2, ',', ' ');
    }

    public function montoInafecto($inafecto)
    {
        $a = 0;
        if ($inafecto[0]['vd_ina'] !== 0) {
            $a += $inafecto[0]['ven_ina'];
        } else {
            $a = 0;
        }

        return number_format($a, 2, ',', ' ');
    }

    public function montoIsc($isc)
    {
        $a = 0;

        foreach ($isc as $arr) {

            if ($arr['vd_isc'] !== 0) {
                $a += $arr['vd_isc'];
            } else {
                $a = 0;
            }
        }
        return number_format($a, 2, ',', ' ');
    }

    public function montoIgv($igv)
    {
        $a = 0;

        foreach ($igv as $arr) {

            if ($arr['vd_ina'] == 0) {
                $a += $arr['vd_can'] * $arr['vd_igv_unico'];
            } else {
                $a = 0;
            }
        }
        return number_format($a, 2, ',', ' ');
    }

    public function montoDesc($des)
    {
        $a = 0;

        foreach ($des as $arr) {

            if ($arr['vd_des'] !== 0) {
                $a += $arr['vd_des'];
            } else {
                $a = 0;
            }
        }
        return number_format($a, 2, ',', ' ');
    }
    public function tipomoneda($moneda){

 
        switch ($moneda) {
            case 'PEN':
                $var = 'S/.';
                break;
            case 'USD':
                $var = '$';
                break;
                default:
                $var = "";
                break;
        }
    
    return $var;
    
    }
    public function montoDocum($docu)
    {
        $a = 0;
        $inafecto = $docu[0]['ven_ina'];
        foreach ($docu as $arr) {

            if ($arr['vd_ina'] == 0) {
                $a += ($arr['vd_can'] * $arr['vd_igv_unico']) +  (($arr['vd_pre'] - $arr['vd_igv_unico']) * $arr['vd_can']) - $arr['vd_des'];
            } else if ($arr['vd_ina'] !== 0) {
                $a =  $inafecto - $arr['vd_des'];
            } else {
                $a = 0;
            }
        }
        return number_format($a, 2, ',', ' ');
    }

    public function montoPagar($pagar)
    {
        $a = 0;
        $inafecto = $pagar[0]['ven_ina'];
        $montoper = $pagar[0]['ven_per'];
        foreach ($pagar as $arr) {
            if ($arr['vd_ina'] == 0) {
                $a += ($arr['vd_can'] * $arr['vd_igv_unico']) +  (($arr['vd_pre'] - $arr['vd_igv_unico']) * $arr['vd_can']) - $arr['vd_des'] + $montoper;
            } else if ($arr['vd_ina'] !== 0) {
                $a =  $inafecto - $arr['vd_des'] + $montoper;
            } else {
                $a = 0;
            }
        }
        return number_format($a, 2, ',', ' ');
    }

    public function montoPagadosoles($pagar)
    {
        $a = 0;
        foreach ($pagar as $arr) {
            if($arr['mnd_id']==='PEN'){
                $a += $arr['pag_tot'];
            }
        }
        return number_format($a, 2, ',', ' ');
    }
    public function montoPagadodolares($pagar)
    {
        $a = 0;
        foreach ($pagar as $arr) {
        if($arr['mnd_id']==='USD'){
                $a += $arr['pag_tot'];
            }
        }
        return number_format($a, 2, ',', ' ');
    }

    public function pesoTotal($peso)
    {
        $a = 0;

        foreach ($peso as $arr) {
     
                $a += ($arr['vd_can'] * $arr['pro_pes']);
         
        }
        return $a;
    }
}
