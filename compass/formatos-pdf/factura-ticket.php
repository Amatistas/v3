
<?php
require('fpdf/fpdf.php');
// require('invoice/invoice.php');




$fpdf = new FPDF($orientation='P',$unit='mm', array(80,350),true);
$fpdf->AddPage();
$fpdf->SetFont('Arial','B',8);    //Letra Arial, negrita (Bold), tam. 20
$textypos = 20;
$fpdf->setY(2);
$fpdf->setX(20);
$fpdf->Cell(37,$textypos,$fpdf->Image('your-logo-here.png', $fpdf->GetX(0), $fpdf->GetY(0),35),0);
$fpdf->Ln(10);
// $fpdf->SetFont('Arial','',8); 
// $fpdf->setXY(0,25);
// $fpdf->MultiCell(75,4,"RUC 20552745419 \n "."FACTURA ELECTRÓNICA\n"."FF01-123\n",0,'C');
// $fpdf->Ln(10);
$fpdf->SetFont('Arial','',8); 
$fpdf->setXY(0,25);
$fpdf->MultiCell(75,3,"CONTABILIZADO\n "."Jr. Las Crucinelas 435 Urb. Las Flores\n"."LIMA-LIMA-LOS OLIVOS\n"."Email: contabilizado@gmail.com / Teléf: 3750106 Cel: 921535282 \n",0,'C');
$fpdf->Ln(10);
$fpdf->SetFont('Arial','B',8); 
$fpdf->setXY(0,42);
$fpdf->MultiCell(75,4,"RUC 20552745419 \n "."FACTURA ELECTRÓNICA\n"."FF01-123\n",0,'C');
$fpdf->Ln(10);
$fpdf->SetFont('Arial','',8); 
$fpdf->setXY(0,55);
$fpdf->MultiCell(75,4,"Cliente: CODIMAKT PERU S.A.C \n"."DNI: 48285071\n"."Dirección: LOS OLIVOS - LIMA-LIMA-LOS OLIVOS",0,'C');
$fpdf->Ln(3);
$fpdf->setXY(0,67);
$fpdf->MultiCell(75,4,"Fecha Emisión: 11-09-2020 \n"."Condición: CONTADO\n"."G.R Remitente: \n"."G.R Transportista: \n",0,'C');
$fpdf->setXY(0,83);
$fpdf->MultiCell(75,4,"Fecha Emisión: 11-09-2020\n"."Tipo Moneda: SOLES\n"."Condición de Pago: EFECTIVO\n",0,'C');
$fpdf->Ln(3);
$fpdf->SetFont('Arial','',8);    //Letra Arial, negrita (Bold), tam. 20
$textypos+=6;
// $fpdf->setX(1);
// $textypos+=6;
// $fpdf->setX(1);
// $fpdf->Cell(10,5,'CANT',0,'','C');
// $fpdf->Cell(30,5,'DESCRIP',0,'','C');
// $fpdf->Cell(15,5,'PRECIO',0,'','C');
// $fpdf->Cell(15,5,'TOTAL',0,'','C');
$fpdf->setX(1);
$fpdf->Cell(5,5,'-----------------------------------------------------------------------------------------------------------------------------');
$fpdf->Ln();
$fpdf->setX(1);
$fpdf->Cell(30,5,substr('COMPUTADORA LENOVO A5 CON BETA DE LADO',0,40),0,'C');
$fpdf->Ln();
$fpdf->setX(1);
$fpdf->Cell(22,5,'Cant. 1 UNI',0,'L');
$fpdf->Cell(25,5,"100.000 S./",0,'','L');
$fpdf->Cell(15,5,"100.000 S./",0,'','L');



$fpdf->Ln(10);
$fpdf->setX(30);
$fpdf->Cell(25,3,"AFECTO: ",0,'','L');
$fpdf->Cell(15,3,"1.000 S./",0,'','L');
$fpdf->Ln(5);
$fpdf->setX(30);
$fpdf->Cell(25,3,"ISC: ",0,'','L');
$fpdf->Cell(15,3,"1.000 S./",0,'','L');
$fpdf->Ln(5);
$fpdf->setX(30);
$fpdf->Cell(25,3,"IGV: ",0,'','L');
$fpdf->Cell(15,3,"1.000 S./",0,'','L');
$fpdf->Ln(5);
$fpdf->setX(30);  
$fpdf->Cell(25,3,"TOTAL: ",0,'','L');
$fpdf->Cell(15,3,"1.000 S./",0,'','L');
$fpdf->setX(1);
$fpdf->Ln(5);
$fpdf->Cell(5,3,'SON: SESENTA Y TRES CON 00/100 Soles');
$fpdf->Ln(5);
$fpdf->setX(20);
$fpdf->Cell(35,$textypos,$fpdf->Image('qr.jpg', $fpdf->GetX(0), $fpdf->GetY(0),35),0);
$fpdf->Ln(40);
$fpdf->Cell(60,3,"REPRESENTACIÓN IMPRESA DEL",0,'','C');
$fpdf->Ln();
$fpdf->Cell(60,3,"COMPROBANTE DE PAGO ELECTRÓNICO",0,'','C');
$fpdf->Ln();
$fpdf->Cell(60,3,"ESTE DOCUMENTO PUEDE SER",0,'','C');
$fpdf->Ln();
$fpdf->Cell(60,3,"CONSULTADO EN",0,'','C');
$fpdf->Ln();
$fpdf->Cell(60,3,"http://www.contabilizado.com",0,'','C');
$fpdf->output('I','nombre.fpdf','UTF-8');

?>
