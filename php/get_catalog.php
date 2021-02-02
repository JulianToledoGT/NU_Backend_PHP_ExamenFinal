<?php
    $json = file_get_contents("../data/data-1.json");
    $arr1 = json_decode($json, true);

    $catalog = $_POST["catalog"];

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

    $catalogList = json_encode(unique_array_data($arr1, $catalog));
    echo $catalogList
?>
