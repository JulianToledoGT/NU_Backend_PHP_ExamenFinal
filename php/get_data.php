<?php
    $json = file_get_contents("../data/data-1.json");
    $arr1 = json_decode($json);

    $ciudad          = $_POST["ciudad"];
    $tipo            = $_POST["tipo"];
    $priceRangeStart = $_POST["priceRangeStart"];
    $priceRangeEnd   = $_POST["priceRangeEnd"];
    
    $filtrado = json_encode(
                    array_filter(
                        $arr1,
                        function($val) use($ciudad, $tipo, $priceRangeStart, $priceRangeEnd){
                            return
                            ($val->Ciudad == $ciudad || $ciudad == "")
                            &&
                            ($val->Tipo == $tipo || $tipo == "")
                            &&
                            str_replace(",", "", str_replace("$", "", $val->Precio)) >= $priceRangeStart
                            &&
                            str_replace(",", "", str_replace("$", "", $val->Precio)) <= $priceRangeEnd;
                        }
                    )
                );
                
    echo $filtrado;
?>
