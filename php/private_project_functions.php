<?php
    $json = file_get_contents("../data/data-1.json");
    $arr1 = json_decode($json, true);
    //$arr2 = json_decode($json);

    function unique_array_data($array, $key) {
        $i = 0;
        $distinct = array();
        $arraykey = array();
    
        foreach($array as $val) {
            if (!in_array($val[$key], $arraykey)) {
                $arraykey[$i] = $val[$key];
                $distinct[$i] = $val[$key];
            }
            $i++;
        }
        return $distinct;
    };

    $param = $_POST['param'];
    $ciudades = json_encode(unique_array_data($arr1, 'Ciudad'));
    echo $ciudades

/*
    print_r($ciudades);
    echo "<br>";
    $tipos = json_encode(unique_array_data($arr1, 'Tipo'));
    print_r($tipos);
    echo "<br>";

    $filtrado = json_encode(
                    array_filter(
                        $arr2,
                        function($val) {
                            return
                                $val->Ciudad == "New York"
                                &&
                                $val->Tipo == "Casa de Campo"
                                &&
                                str_replace(",", "", str_replace("$", "", $val->Precio)) >= 200
                                &&
                                str_replace(",", "", str_replace("$", "", $val->Precio)) <= 80000
                                ;
                        }
                    )
                );

    echo $filtrado;
*/
?>
