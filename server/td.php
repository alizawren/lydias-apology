<?php
session_start();

if (!isset($_SESSION["transmute"])) {
    $_SESSION["transmute"] = "false";
}
if (!isset($_SESSION["realm"])) {
    $_SESSION["realm"] = "";
}

if (isset($_REQUEST["row"]) && isset($_REQUEST["col"])) {

    $row = $_REQUEST["row"];
    $col = $_REQUEST["col"];
    // send back the right link based on row and col (which card was chosen)
    if ($row == 1 && $col == 1) {
        $_SESSION["realm"] = "https://www.alizawren.com/";
    }
    else {
        $_SESSION["realm"] = "about:blank";
    }
}

if (isset($_REQUEST["input"])) {
    if ($_REQUEST["input"] == "code") {
        $_SESSION["transmute"] = "true";
    }
}
echo json_encode(array("flag" => $_SESSION["transmute"], "realm" => $_SESSION["realm"]));
